'use server';

export default async function deleteImage(publicId: string) {
  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('upload_preset', 'hhwhba0i');
  formData.append('api_key', process.env.CLOUDINARY_API_KEY || '');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dmgzksj3l/image/destroy`,
      {
        method: 'POST',
        body: formData,
      },
    );
    let result = await response.json();

    return `${result.url}`;
  } catch (error) {
    console.log(error);
    return null;
  }
}
