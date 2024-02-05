"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRowController = void 0;
const common_1 = require("@nestjs/common");
const report_row_service_1 = require("./report-row.service");
const create_report_row_dto_1 = require("./dto/create-report-row.dto");
const update_report_row_dto_1 = require("./dto/update-report-row.dto");
const swagger_1 = require("@nestjs/swagger");
let ReportRowController = class ReportRowController {
    constructor(reportRowService) {
        this.reportRowService = reportRowService;
    }
    async create(reportId, dataTypeId, createReportRowDto) {
        return await this.reportRowService.create(createReportRowDto, +reportId, +dataTypeId);
    }
    async findAll() {
        return await this.reportRowService.findAll();
    }
    async findOne(id) {
        return await this.reportRowService.findOne(+id);
    }
    async update(id, updateReportRowDto) {
        return await this.reportRowService.update(+id, updateReportRowDto);
    }
    async remove(id) {
        return await this.reportRowService.remove(+id);
    }
};
exports.ReportRowController = ReportRowController;
__decorate([
    (0, common_1.Post)(':reportId/:dataTypeId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('reportId')),
    __param(1, (0, common_1.Param)('dataTypeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_report_row_dto_1.CreateReportRowDto]),
    __metadata("design:returntype", Promise)
], ReportRowController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportRowController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportRowController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_report_row_dto_1.UpdateReportRowDto]),
    __metadata("design:returntype", Promise)
], ReportRowController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportRowController.prototype, "remove", null);
exports.ReportRowController = ReportRowController = __decorate([
    (0, common_1.Controller)('report-row'),
    (0, swagger_1.ApiTags)('report-row'),
    __metadata("design:paramtypes", [report_row_service_1.ReportRowService])
], ReportRowController);
//# sourceMappingURL=report-row.controller.js.map