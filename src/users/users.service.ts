import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
