import { CreateReportDataTypeDto } from './dto/create-report-data-type.dto';
import { UpdateReportDataTypeDto } from './dto/update-report-data-type.dto';
import { DatabaseService } from 'src/database/database.service';
export declare class ReportDataTypeService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(dto: CreateReportDataTypeDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: UpdateReportDataTypeDto): Promise<any>;
    remove(id: number): Promise<any>;
}
