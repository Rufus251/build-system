import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class ReportService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(dto: CreateReportDto, authorId: number, objectId: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateReportDto): Promise<any>;
    remove(id: number): Promise<any>;
}
