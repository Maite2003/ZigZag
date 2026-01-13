
const CLOUDINARY_PRESET = "zigzag_uploads";
const CLOUDINARY_CLOUD_NAME = "dsfdbynym";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Error subiendo imagen a Cloudinary');
  const data = await res.json();
  return data.secure_url;
};