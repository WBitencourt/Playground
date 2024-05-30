import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrmService } from '@ORM/orm.service';

interface CreateExampleData {
  name: string;
}

interface UpdateExampleData {
  id: string;
  data: {
    name: string;
  };
}

@Injectable()
export class ExampleService {
  constructor(private readonly ormService: OrmService) {}

  async getExample() {
    const data = await this.ormService.example.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    return {
      message: 'Data fetched successfully!',
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

  async updateExample({ id, data }: UpdateExampleData) {
    try {
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        throw new HttpException('ID must be a number!', HttpStatus.BAD_REQUEST);
      }

      const existingRecord = await this.ormService.example.findUnique({
        where: { id: idNumber },
      });

      if (!existingRecord) {
        throw new HttpException(
          `Record with ID ${idNumber} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedData = await this.ormService.example.update({
        where: {
          id: idNumber,
        },
        data: {
          ...data,
        },
      });

      return {
        message: 'Data updated successfully!',
        data: updatedData,
      };
    } catch (error: any) {
      error.message = `ExampleService - updateExample -> ${error.message}`;
      throw error;
    }
  }

  async deleteExample(id: string) {
    try {
      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        throw new HttpException('ID must be a number!', HttpStatus.BAD_REQUEST);
      }

      const existingRecord = await this.ormService.example.findUnique({
        where: { id: idNumber },
      });

      if (!existingRecord) {
        throw new HttpException(
          `Record with ID ${idNumber} not found`,
          HttpStatus.BAD_REQUEST,
        );
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
    } catch (error: any) {
      error.message = `ExampleService - deleteExample -> ${error.message}`;
      throw error;
    }
  }
}
