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
                const role = await this.databaseService.role.findFirst({
                    where: {
                        RoleOnUser: {
                            some:{
                                userId: user.id
                            }
                        }
                    }
                })
                const roleName = role.name
                return {user, roleName}
            }
            else {
                throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED)
            }
        } catch (error) {
            return error
        }
    }

}
