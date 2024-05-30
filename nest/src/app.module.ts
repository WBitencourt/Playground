import { Module } from '@nestjs/common';
import { AppController } from '@app.controller';
import { AppService } from '@app.service';
import { OrmModule } from '@ORM/orm.module';
import { ExampleModule } from '@example/example.module';

@Module({
  imports: [OrmModule, ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
