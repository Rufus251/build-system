import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginEmail(dto: LoginUserDto): Promise<{
        id: number;
        role: string;
        login: string;
        name: string;
        password: string;
        phone: string;
    }>;
}
