import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<{
        id: number;
        role: string;
        login: string;
        name: string;
        password: string;
        phone: string;
    }>;
}
