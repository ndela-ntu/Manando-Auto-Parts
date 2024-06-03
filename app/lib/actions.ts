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
import Address from '../models/address';
import Customer from '../models/customer';
import mongoose from 'mongoose';

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
    .refine((file: File) => {
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

const AddressSchema = z.object({
  id: z.string(),
  streetAddress: z.string().min(1, { message: 'Address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  postalCode: z.coerce
    .number()
    .gt(0, { message: 'Postal address is required' }),
});

export type AddressState = {
  errors?: {
    streetAddress?: string[];
    city?: string[];
    postalCode?: string[];
  };
  message?: string | null;
  isSuccess?: boolean;
  addressId?: string; 
};

const CreateAddressSchema = AddressSchema.omit({ id: true });

export async function createAddress(
  prevState: AddressState,
  formData: FormData,
) {
  const validatedFields = CreateAddressSchema.safeParse({
    streetAddress: formData.get('address'),
    city: formData.get('city'),
    postalCode: formData.get('postalCode'),
  });

  if (!validatedFields.success) {
    return <AddressState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missed fields, failed to create product.',
    };
  }

  try {
    const { streetAddress, city, postalCode } =
      validatedFields.data;

      await connectMongo();
      const address = await Address.create({
        streetAddress,
        city,
        postalCode,
      });

      return <AddressState>{
        message: 'Success',
        isSuccess: true,
        addressId: address._id.toString(),
      }
  } catch (error) {
    return <AddressState>{
      message: 'Error from server',
    };
  }
}

const PersonalDetailsSchema = z.object({
  id: z.string(),
  fullNames: z.string().min(1, { message: 'Full names required' }),
  email: z.string().min(0, { message: 'Email is required' }),
  phoneNumber: z.coerce
    .number()
    .gt(0, { message: 'Number is required' }),
});

export type PersonalDetailsState = {
  errors?: {
    fullNames?: string[];
    email?: string[];
    phoneNumber?: string[];
  };
  message?: string | null;
};

const CreateProductDetailsSchema = PersonalDetailsSchema.omit({ id: true });

export async function createPersonalDetails(
  addressId: string,
  prevState: PersonalDetailsState,
  formData: FormData,
) {
  const validatedFields = CreateProductDetailsSchema.safeParse({
    fullNames: formData.get('fullNames'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  });

  if (!validatedFields.success) {
    return <PersonalDetailsState>{
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missed fields, failed to create product.',
    };
  }

  try {
    const { fullNames, email, phoneNumber } =
      validatedFields.data;

      const address = new mongoose.Schema.Types.ObjectId(addressId);

      await connectMongo();
      await Customer.create({
        fullNames,
        email,
        phoneNumber,
        address,
      });

      return <PersonalDetailsState>{
        message: 'Success',
      }
  } catch (error) {
    return <PersonalDetailsState>{
      message: 'Error from server',
    };
  }
}

