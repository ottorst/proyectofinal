import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';  // Importa Readable stream

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

  static async uploadFile(buffer: Buffer, originalName?: string) {
    const options: UploadApiOptions = {
      folder: 'uploads',
      public_id: originalName,
      resource_type: 'auto',
    };

    // Convierte el buffer en un readable stream
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);  // Señala el final del flujo de datos

    return new Promise((resolve, reject) => {
      stream.pipe(
        cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
      );
    });
  }
}
