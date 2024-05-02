import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './ORM/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
