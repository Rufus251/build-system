"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportDataTypeModule = void 0;
const common_1 = require("@nestjs/common");
const report_data_type_service_1 = require("./report-data-type.service");
const report_data_type_controller_1 = require("./report-data-type.controller");
const database_module_1 = require("../database/database.module");
let ReportDataTypeModule = class ReportDataTypeModule {
};
exports.ReportDataTypeModule = ReportDataTypeModule;
exports.ReportDataTypeModule = ReportDataTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [report_data_type_controller_1.ReportDataTypeController],
        providers: [report_data_type_service_1.ReportDataTypeService],
    })
], ReportDataTypeModule);
//# sourceMappingURL=report-data-type.module.js.map