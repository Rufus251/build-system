import { ReportRowService } from './report-row.service';
import { CreateReportRowDto } from './dto/create-report-row.dto';
import { UpdateReportRowDto } from './dto/update-report-row.dto';
export declare class ReportRowController {
    private readonly reportRowService;
    constructor(reportRowService: ReportRowService);
    create(reportId: string, dataTypeId: string, createReportRowDto: CreateReportRowDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateReportRowDto: UpdateReportRowDto): Promise<any>;
    remove(id: string): Promise<any>;
}
