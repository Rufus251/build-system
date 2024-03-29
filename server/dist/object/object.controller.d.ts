import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
export declare class ObjectController {
    private readonly objectService;
    constructor(objectService: ObjectService);
    create(createObjectDto: CreateObjectDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateObjectDto: UpdateObjectDto): Promise<any>;
    remove(id: string): Promise<any>;
}
