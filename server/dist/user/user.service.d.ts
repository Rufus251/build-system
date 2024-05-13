import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(dto: CreateUserDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(userId: number, dto: UpdateUserDto): Promise<any>;
    remove(id: number): Promise<{
        id: number;
        role: string;
        login: string;
        name: string;
        password: string;
        phone: string;
    }>;
}
