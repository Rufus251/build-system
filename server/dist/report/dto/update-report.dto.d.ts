import { CreateReportDto } from './create-report.dto';
declare const UpdateReportDto_base: import("@nestjs/common").Type<Partial<CreateReportDto>>;
export declare class UpdateReportDto extends UpdateReportDto_base {
    additional?: string;
    workType?: string;
    workDate?: Date;
    weather?: string;
    temperature?: string;
    workersAmount?: number;
    ItrAmount?: number;
    hasProblems?: boolean;
    hasAdditional?: boolean;
}
export {};
