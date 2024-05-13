import { DatabaseService } from 'src/database/database.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    loginUser(dto: LoginUserDto): Promise<{
        id: number;
        role: string;
        login: string;
        name: string;
        password: string;
        phone: string;
    }>;
}
