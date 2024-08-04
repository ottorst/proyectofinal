import { Module, forwardRef } from '@nestjs/common';
import { FileUploadService } from './image-upload.service.js';
import { FileUploadController } from 'src/modules/image-upload/image-upload.controller';
import { CloudinaryService } from 'src/clouinary/cloudinary.service';

@Module({
 
  providers: [FileUploadService, CloudinaryService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}