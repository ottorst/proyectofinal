import {
    Controller,
    Post,
    Param,
    UseGuards,
    HttpCode,
    UseInterceptors,
    UploadedFile,
    ParseUUIDPipe,
    BadRequestException,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
  import { FileUploadService } from './image-upload.service';
  import { FileValidationPipe } from 'src/pipes/image-upload.pipe';
  import { FileInterceptor } from '@nestjs/platform-express';
  
  @ApiTags() // Etiqueta para agrupar las rutas en Swagger
  @Controller()
  export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}
  
    @Post('uploadImage')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
    @ApiOperation({ summary: 'Subir una imagen' }) // Descripción de la operación
    @ApiBody({
      description: 'Imagen que se subirá',
      required: true,
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