import cloudinary from "cloudinary";

const {
  CLOUDINARY_CLOUD_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
} = process.env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const uploadImage = async (imagePath, folder = "") => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder,
  };

  try {
    const result = await cloudinary.v2.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const destroyImage = async (public_id) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { uploadImage, destroyImage };
