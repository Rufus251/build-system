import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class ObjectService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(complexId: number, userId: number, dto: CreateObjectDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateObjectDto): Promise<any>;
    remove(id: number): Promise<any>;
    findOOU(): Promise<any>;
}
