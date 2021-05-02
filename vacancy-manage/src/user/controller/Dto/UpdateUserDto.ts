import { Role } from '../../model/enum/role.enum';

export class UpdateUserDto {
    _id: string;
    company?: string;
    name: string;
    username: string;
    password: string;
    role: Role;
}