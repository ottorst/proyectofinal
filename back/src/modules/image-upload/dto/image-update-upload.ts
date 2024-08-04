import { PartialType } from '@nestjs/mapped-types';
import { CreateFileUploadDto } from './create-image-upload.dto';

export class UpdateFileUploadDto extends PartialType(CreateFileUploadDto) {}