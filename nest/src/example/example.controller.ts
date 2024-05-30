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
import { ExampleService } from '@example/example.service';
import { DeleteExampleDto } from '@example/dto/delete-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@ApiTags('Example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('get')
  async getExample() {
    return await this.exampleService.getExample();
  }

  @Post('create')
  async createExample(@Body() body) {
    return await this.exampleService.createExample({
      name: body?.name,
    });
  }

  @Put('update/:id')
  async updateExample(@Param() param: UpdateExampleDto, @Body() body) {
    return await this.exampleService.updateExample({
      id: param?.id,
      data: body,
    });
  }

  @Delete('delete/:id')
  async deleteExample(@Param() param: DeleteExampleDto) {
    try {
      return await this.exampleService.deleteExample(param.id);
    } catch (error: any) {
      error.message = `ExampleController - deleteExample -> ${error.message}`;
      throw error;
    }
  }
}
