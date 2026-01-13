import axios from 'axios';

const CLOUDINARY_PRESET = "zigzag_uploads";
const CLOUDINARY_CLOUD_NAME = "dsfdbynym";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData);

  if (res.status !== 200) throw new Error('Error subiendo imagen a Cloudinary');;
  return res.data.secure_url;
};