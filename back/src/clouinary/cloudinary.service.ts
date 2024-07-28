import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
@Injectable()
export class CloudinaryService {
  constructor() {
    dotenv.config({
      path: '.env.development.local',
    });
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(buffer: Buffer, orignalName?: string) {
    const options: UploadApiOptions = {
      folder: 'uploads',
      public_id: orignalName,
      resource_type: 'auto',
    };
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      ); 
      stream.write(buffer);
      stream.end();
    });
  }
}
/*
async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { buffer, originalname } = file;
    const result = await this.cloudinaryService.uploadFile(buffer, originalname);
*/