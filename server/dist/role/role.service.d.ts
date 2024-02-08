import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class RoleService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(dto: CreateRoleDto): Promise<any>;
    findAll(): Promise<any>;
    findAllRolesOnUser(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateRoleDto): Promise<any>;
    remove(id: number): Promise<any>;
}
