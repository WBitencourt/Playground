import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '@app/app.service';
import { DeleteExampleDto } from '@app/dto/delete-example.dto';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('alive')
  async serverAlive() {
    return await this.appService.serverAlive();
  }

  @Post('example')
  async createExample(@Body() body) {
    return await this.appService.createExample({
      name: body?.name,
    });
  }

  @Put('example')
  async updateExample(@Body() body) {
    return await this.appService.updateExample({
      id: body?.id,
      name: body?.name,
    });
  }

  @Delete('example/:id')
  async deleteExample(@Param() param: DeleteExampleDto) {
    return await this.appService.deleteExample(param.id);
  }
}
