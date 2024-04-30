import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverAlive(): string {
    return 'Server is running and alive!';
  }
}
