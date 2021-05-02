import { Role } from '../../model/enum/enum';

export class UpdateUserDto {
    _id: string;
    company?: string;
    name: string;
    username: string;
    password: string;
    role: Role;
}