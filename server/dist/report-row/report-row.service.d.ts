import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class ReportRowService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(dto: CreateReportRowDto, reportId: number, dataTypeId: number): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateReportRowDto): Promise<any>;
    remove(id: number): Promise<any>;
}
