import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(authorId: string, objectId: string, createReportDto: CreateReportDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findMyReports(id: string): Promise<any>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<any>;
    remove(id: string): Promise<any>;
}
