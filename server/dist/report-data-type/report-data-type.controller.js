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
exports.ReportDataTypeController = void 0;
const common_1 = require("@nestjs/common");
const report_data_type_service_1 = require("./report-data-type.service");
const create_report_data_type_dto_1 = require("./dto/create-report-data-type.dto");
const update_report_data_type_dto_1 = require("./dto/update-report-data-type.dto");
const swagger_1 = require("@nestjs/swagger");
let ReportDataTypeController = class ReportDataTypeController {
    constructor(reportDataTypeService) {
        this.reportDataTypeService = reportDataTypeService;
    }
    async create(createReportDataTypeDto) {
        return await this.reportDataTypeService.create(createReportDataTypeDto);
    }
    async findAll() {
        return await this.reportDataTypeService.findAll();
    }
    async findOne(id) {
        return await this.reportDataTypeService.findOne(+id);
    }
    async update(id, updateReportDataTypeDto) {
        return await this.reportDataTypeService.update(+id, updateReportDataTypeDto);
    }
    async remove(id) {
        return await this.reportDataTypeService.remove(+id);
    }
};
exports.ReportDataTypeController = ReportDataTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_data_type_dto_1.CreateReportDataTypeDto]),
    __metadata("design:returntype", Promise)
], ReportDataTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportDataTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportDataTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_report_data_type_dto_1.UpdateReportDataTypeDto]),
    __metadata("design:returntype", Promise)
], ReportDataTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportDataTypeController.prototype, "remove", null);
exports.ReportDataTypeController = ReportDataTypeController = __decorate([
    (0, common_1.Controller)('report-data-type'),
    (0, swagger_1.ApiTags)('report-data-type'),
    __metadata("design:paramtypes", [report_data_type_service_1.ReportDataTypeService])
], ReportDataTypeController);
//# sourceMappingURL=report-data-type.controller.js.map