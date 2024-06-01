'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import Product, { IProduct } from '../models/product';
import uploadImage from '../utils/upload-image';
import connectMongo from '../utils/connect-mongo';
import deleteImage from '../utils/delete-image';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.coerce.number().gt(0, { message: 'Price should be greater than 0' }),
  quantity: z.coerce
    .number()
    .gte(0, { message: 'Quantity should be greater than or equal to 0' }),
  image: z
    .instanceof(File)
    .refine((file: File) => file.size !== 0, 'Image is required')
    .refine((file) => {
      return !file || file.size <= 1024 * 1024 * 3;
    }, 'File size must be less than 3MB'),
  category: z.enum(['INTERIOR', 'EXTERIOR']),
});

export type ProductState = {
  errors?: {
    image?: string[];
    name?: string[];
    description?: string[];
    price?: string[];
    quantity?: string[];
    category?: string[];
  };
  message?: string | null;
};

const CreateProductSchema = ProductSchema.omit({ id: true });
const UpdateProductSchema = ProductSchema.omit({ id: true, image: true });

export async function createProduct(
  prevState: ProductState,
  formData: FormData,
) {
  const validatedFields = CreateProductSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    image: formData.get('image'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missed fields, failed to create product.',
    };
  }

  try {
    const { name, description, price, quantity, image, category } =
      validatedFields.data;

    const result = await uploadImage(image);

    if (result) {
      let { url, publicId } = result;

      await connectMongo();
      await Product.create({
        name,
        description,
        price,
        quantity,
        imagePublicId: publicId,
        imageURL: url,
        category,
      });
    }
  } catch (error) {
    return {
      message: 'Error from server',
    };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(
  product: IProduct,
  prevState: ProductState,
  formData: FormData,
) {
  const validatedFields = UpdateProductSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missed fields, failed to create product.',
    };
  }

  try {
    const { name, description, price, quantity, category } =
      validatedFields.data;

    const imageEdited = formData.get('imageEdited') === 'true';
    if (imageEdited) {
      const image = formData.get('image');
      if (image instanceof File) {
        await deleteImage(product.imagePublicId);
        const result = await uploadImage(image);

        if (result) {
          let { url, publicId } = result;

          await connectMongo();
          await Product.findOneAndUpdate(
            { _id: product.id },
            {
              name,
              description,
              price,
              quantity,
              imagePublicId: publicId,
              imageURL: url,
              category,
            },
          );
        }
      }
    } else {
      await connectMongo();
      await Product.findOneAndUpdate(
        { _id: product.id },
        {
          name,
          description,
          price,
          quantity,
          imagePublicId: product.imagePublicId,
          imageURL: product.imageURL,
          category,
        },
      );
    }
  } catch (error) {
    return {
      message: 'Error from server',
    };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(id: string, publicId: string) {
  await Product.findByIdAndDelete(id);
  await deleteImage(publicId);

  revalidatePath('/dashboard/products');
}
