import { Body, Headers, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiHeader, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JsonObject } from '@prisma/client/runtime/library';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @Post("loginPassword")
    @ApiResponse({ status: 201, description: 'Return user' })
    @ApiResponse({ status: 401, description: 'Incorrect password' })
    @ApiResponse({ status: 404, description: 'User Not Found' })
    async loginPassword(@Body() dto: LoginUserDto) {
        const res = await this.authService.loginPassword(dto)
        return res
    }

    @Get("loginJwt")
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'Return user' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async loginJwt(@Headers() header: JsonObject) {
        const authorization = header.authorization.toString()
        const headers = authorization.split(" ")
        if (headers[0] === 'Bearer') {
            const token = headers[1]
            const res = await this.authService.loginJwt(token)
            return res
        }
        else {
            throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED)
        }
    }
}
