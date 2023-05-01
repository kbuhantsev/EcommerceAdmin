// import multiparty from "multiparty";
import { withFileUpload, getConfig } from "next-multiparty";
import { uploadImage } from "@/lib/cloudinary";

export default withFileUpload(async (req, res) => {
  const downloadedFiles = [];
  for (const file of req.files) {
    const result = await uploadImage(file.filepath, "ecommerce");
    downloadedFiles.push(result);
  }
  res.json(downloadedFiles);
});

export const config = getConfig();
