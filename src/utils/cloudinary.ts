import {UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, IMAGE_FILE_UPLOAD_SIZE } from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const uploadImage = async (file: any): Promise<UploadApiResponse> => {
  // check if file size is greater than IMAGE_FILE_UPLOAD_SIZE
  if (file.size > IMAGE_FILE_UPLOAD_SIZE) {
    throw new Error("File size too large");
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Hàm upload nhiều file
const uploadImages = async (files: any[]): Promise<UploadApiResponse[]> => {
  return Promise.all(files.map(file => uploadImage(file)));
};

export { uploadImage, uploadImages };