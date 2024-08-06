import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from "src/clouinary/cloudinary.service";

@Injectable()
export class FileUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
  
  ) {}

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }


    const url = await this.cloudinaryService.uploadFile({
      fieldname: file.fieldname,
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
   

    return url ;
  }
}