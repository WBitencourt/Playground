import { IsNumberString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExampleDto {
  @ApiProperty({
    description: 'ID to update from example table',
    example: '10',
    type: String,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  id: string;
}
