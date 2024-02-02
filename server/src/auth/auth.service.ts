import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) { }

    async createUser(dto: CreateUserDto) {
        try {
            const hashPass = await bcrypt.hash(dto.password, 7);
            const role = await this.databaseService.role.findFirst({ where: { name: dto.role } })
            
            const res = await this.databaseService.user.create({
                data: {
                    login: dto.login,
                    password: hashPass,
                    name: dto.name,
                    RoleOnUser: {
                        create: {
                            role: {
                                connect: {
                                    id: role.id
                                }
                            }
                        }
                    }
                }
            })
            return res
        } catch (error) {
            return error
        }
    }

    async loginUser(dto: LoginUserDto) {
        try {
            let user = await this.databaseService.user.findFirst({
                where: {
                    login: dto.login
                }
            })
            console.log(user);
            
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
            return error
        }
    }

}
