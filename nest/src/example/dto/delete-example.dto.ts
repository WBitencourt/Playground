import { IsNumberString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteExampleDto {
  @ApiProperty({
    description: 'ID to delete from example table',
    example: '10',
    type: String,
    required: true,
    nullable: false,
  })
  @IsNumberString()
  id: string;
}
