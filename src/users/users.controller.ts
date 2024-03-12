import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto).then()
      .catch(() => {
        throw new BadRequestException('Invalid email or email is already registered')
      })
  }

  @Post('login')
  login(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.auth(createUserDto.email, createUserDto.password).then()
      .catch(() => {
        throw new UnauthorizedException()
      })
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
