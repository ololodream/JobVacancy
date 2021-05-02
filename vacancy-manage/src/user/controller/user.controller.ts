import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../service/user.service';
import { IUser } from '../model/User';
import { CreateUserDto, UpdateUserDto } from './Dto/UserDto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getAllUsers(): Promise<IUser[]> {
        return this.userService.getUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        await this.userService.addUser(createUserDto);
        res.status(HttpStatus.CREATED).send();
    }

    @Delete(':id')
    async deleteUser(@Param() params, @Res() res: Response) {
        await this.userService.deleteUser(params.id);
        res.status(HttpStatus.OK).send();
    }

    @Put()
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
        await this.userService.updateUser(updateUserDto);
        res.status(HttpStatus.OK).send();
    }
  
}
