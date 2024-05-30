import { Injectable } from '@nestjs/common';
import { OrmService } from '@ORM/orm.service';

interface CreateExampleData {
  name: string;
}

interface UpdateExampleData {
  id: number;
  name: string;
}

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
      message: 'Server is running, alive and connected with database!',
      data,
    };
  }

  async createExample(data: CreateExampleData) {
    const createdData = await this.ormService.example.create({
      data: {
        ...data,
      },
    });

    return {
      message: 'Data created successfully!',
      data: createdData,
    };
  }

  async updateExample(data: UpdateExampleData) {
    const updatedData = await this.ormService.example.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    return {
      message: 'Data updated successfully!',
      data: updatedData,
    };
  }

  async deleteExample(id: string) {
    if (!id) {
      throw new Error('Id is required!');
    }

    if (isNaN(Number(id))) {
      throw new Error('Id must be a number!');
    }

    const deletedData = await this.ormService.example.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      message: 'Data deleted successfully!',
      data: deletedData,
    };
  }
}
