import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
    return newUser
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        id: true,
        name: true,
        bio: true
      }
    })
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { password: false, id: false, name: true, email: true, bio: true }
    })
  }

  async auth(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true, password: true } })
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (isCorrectPassword) return user.id
    else throw new Error()
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
