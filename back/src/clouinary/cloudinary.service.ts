import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { UploadFileDto } from 'src/modules/image-upload/dto/image-upload.dto';

@Injectable()
export class CloudinaryService {
  constructor() {
    dotenvConfig();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile({ buffer, originalname }: UploadFileDto): Promise<string> {
    const options: UploadApiOptions = {
      folder: 'uploads',
      public_id: originalname,
      resource_type: 'auto',
    };

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
      stream.write(buffer);
      stream.end();
    });
  }

  async getUrl(publicId: string): Promise<string> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result.secure_url;
    } catch (error) {
      console.error('Error retrieving Cloudinary resource:', error);
      throw new Error(`Failed to retrieve resource: ${error.message}`);
    }
  }
}
