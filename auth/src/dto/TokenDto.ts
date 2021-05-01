import { Role } from '../model/enum/enum';

export class SignTokenDto {
    username: string;
    password: string;
}

export class VerifyTokenDto {
    token: string;
}