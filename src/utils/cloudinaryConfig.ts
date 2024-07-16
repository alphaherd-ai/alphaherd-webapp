import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { cloudinary } from "./multerConfig"; // your config path
import { NextRequest } from "next/server";

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<UploadResponse> => {
    console.log(fileUri,fileName)
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "product-images", 
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};