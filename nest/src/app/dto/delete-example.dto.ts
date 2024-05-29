import { IsNumberString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteExampleDto {
  @ApiProperty({
    description: 'Id of the example to delete',
    example: '10',
    type: String,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  id: string;
}
