import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root test endpoint for api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: `${HttpStatus.OK}: API is running in port 3001.`,
    type: String,
    isArray: false,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
