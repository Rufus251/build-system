import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UsePipes(new ValidationPipe())
    @Post("loginUser")
    @ApiResponse({ status: 201, description: 'Return user'})
    @ApiResponse({ status: 401, description: 'Incorrect password'})
    @ApiResponse({ status: 404, description: 'User Not Found'})
    async loginEmail(@Body() dto: LoginUserDto){
        const res = await this.authService.loginUser(dto)
        return res
    }
}
