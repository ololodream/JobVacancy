import { HttpService, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUser, User } from '../model/User';
import { connect, disconnect } from '../db/db';
import { CreateUserDto, UpdateUserDto } from 'src/controller/Dto/UserDto';
import { Role } from '../model/enum/enum';

@Injectable()
export class UserService {

    async getUsers(): Promise<IUser[]> {
        connect();
        return await User.find({}).populate('company');
    }

    private async isUserExist(id: string): Promise<boolean> {
        connect();
        return await User.exists({_id: id});
    }

    private async isUsernameExist(username: string): Promise<boolean> {
        connect();
        return await User.exists({username: username});
    }

    async addUser(user: CreateUserDto) {
        connect();
        if (await this.isUsernameExist(user.username)) {
            throw new HttpException("Username exist", HttpStatus.NOT_ACCEPTABLE);
        }
        return User.create(user);
    }

    async deleteUser(id: string) {
        connect();
        if (!await this.isUserExist(id)) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return User.deleteOne({_id: id});
    }

    async updateUser(user: UpdateUserDto) {
        connect();
        if (!await this.isUserExist(user.id)) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        if (user.company) {
            return User.updateOne({_id: user.id}, {name: user.name, password: user.password, role: user.role, company: user.company});
        } else {
            return User.updateOne({_id: user.id}, {name: user.name, password: user.password, role: user.role});
        }
    }
}