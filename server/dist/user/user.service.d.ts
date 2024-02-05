import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(dto: CreateUserDto, roleId: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(userId: number, roleId: number, dto: UpdateUserDto): Promise<any>;
    remove(id: number): Promise<{
        id: number;
        login: string;
        name: string;
        password: string;
    }>;
}
