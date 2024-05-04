import { Injectable } from '@nestjs/common';
import { OrmService } from './ORM/orm.service';

@Injectable()
export class AppService {
  constructor(private readonly ormService: OrmService) {}

  async serverAlive() {
    const data = await this.ormService.example.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    return {
      message: 'Server is running and alive and connected with database!',
      data,
    };
  }
}
