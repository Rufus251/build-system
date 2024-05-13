import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) { }

    async loginUser(dto: LoginUserDto) {
        try {
            let user = await this.databaseService.user.findFirst({
                where: {
                    login: dto.login
                }
            })

            if (!user) {
                throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
            }

            const correctPassword = bcrypt.compareSync(dto.password, user.password)
            if (correctPassword) {
                return user
            }
            else {
                throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED)
            }
        } catch (error) {
            switch (error.status) {
                case 401:
                    throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED)
                case 404:
                    throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
                default:
                    throw new HttpException('Error', HttpStatus.BAD_REQUEST)
            }
        }
    }

}
