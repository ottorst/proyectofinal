import {
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { FileUploadService } from './image-upload.service';
import { FileValidationPipe } from 'src/pipes/image-upload.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Uploads')
@Controller()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir una imagen' })
  @ApiBody({
    description: 'Imagen que se subirá',
    required: true,
    type: 'multipart/form-data', // Especifica que el tipo es multipart/form-data
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen a subir',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida exitosamente',
    schema: {
      type: 'object',
      properties: {
        imgUrl: {
          type: 'string',
          description: 'URL de la imagen subida',
          example: 'https://res.cloudinary.com/demo/image/upload/v1596113742/sample.jpg',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta, archivo no proporcionado',
  })
  async uploadImage(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const { imgUrl } = await this.fileUploadService.uploadFile(file);
    return { imgUrl };
  }
}

