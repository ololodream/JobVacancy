import { Injectable } from '@nestjs/common';
import { connect } from 'src/db/db';
import { MUser } from 'src/model/user.model';
import { UserArgs } from 'src/vacancy/dto/user.args';

@Injectable()
export class UserService {

    async findOneById(id: string) {
        connect();
        return await MUser.findById(id);
    }

    async find(userArgs: UserArgs) {
        connect();
        return await MUser.find(userArgs).select('_id');
    }
}
