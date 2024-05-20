import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) { }

    async validateUser(dto: LoginUserDto) {
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

            if (!correctPassword) {
                throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED)
            }
            return user
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

    async loginPassword(dto: LoginUserDto) {
        const valid = await this.validateUser(dto)
        const jwt = this.jwtService.sign(dto)
        if (valid) {
            await this.databaseService.user.update({
                where: {
                    id: valid.id
                },
                data: {
                    token: jwt
                }
            })
        }
        return { ...valid, jwt }
    }

    async loginJwt(token: string) {
        try {
            const sign = this.jwtService.verify(token)
            if (sign) {
                const user = await this.databaseService.user.findFirst({
                    where: {
                        login: sign.login
                    }
                })
                const login = user.login
                const password = user.password
                const newToken = this.jwtService.sign({ login, password })
                const res = await this.databaseService.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        token: newToken
                    }
                })
                return res
            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED)
        }
    }
}
