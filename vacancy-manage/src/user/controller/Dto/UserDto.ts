import { Role } from '../../model/enum/role.enum';

export class CreateUserDto {
    company?: string;
    name: string;
    username: string;
    password: string;
    role: Role;
}

export class UpdateUserDto {
    id: string;
    company?: string;
    name: string;
    password: string;
    role: Role;
}