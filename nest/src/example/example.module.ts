import { Module } from '@nestjs/common';
import { ExampleController } from '@example/example.controller';
import { ExampleService } from '@example/example.service';
import { OrmModule } from '@ORM/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
