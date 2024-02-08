import { ReportDataTypeService } from './report-data-type.service';
import { CreateReportDataTypeDto } from './dto/create-report-data-type.dto';
import { UpdateReportDataTypeDto } from './dto/update-report-data-type.dto';
export declare class ReportDataTypeController {
    private readonly reportDataTypeService;
    constructor(reportDataTypeService: ReportDataTypeService);
    create(createReportDataTypeDto: CreateReportDataTypeDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateReportDataTypeDto: UpdateReportDataTypeDto): Promise<any>;
    remove(id: string): Promise<any>;
}
