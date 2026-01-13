import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split('/');
    //const fileName = parts[parts.length - 1];
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);

    return match ? match[1] : null;
  } catch (error) {
    console.error("Error parseando URL:", url);
    return null;
  }
};

export const deleteImages = async (imageUrls: string[]) => {
  for (const url of imageUrls) {
    const publicId = getPublicIdFromUrl(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }
};