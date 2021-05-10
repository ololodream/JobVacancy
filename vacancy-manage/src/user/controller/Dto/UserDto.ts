import { IsNotEmpty } from 'class-validator';
import { Role } from '../../model/enum/role.enum';

export class CreateUserDto {
    company?: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    role: Role;
}

export class UpdateUserDto {
    @IsNotEmpty()
    id: string;
    company?: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    role: Role;
}