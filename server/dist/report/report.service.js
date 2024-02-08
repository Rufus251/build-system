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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let ReportService = class ReportService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(dto, authorId, objectId) {
        try {
            const res = await this.databaseService.report.create({
                data: {
                    ...dto,
                    author: {
                        connect: {
                            id: authorId
                        }
                    },
                    object: {
                        connect: {
                            id: objectId
                        }
                    }
                }
            });
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findAll() {
        try {
            const res = await this.databaseService.report.findMany();
            const reports = [];
            for await (let report of res) {
                const reportRows = await this.databaseService.reportRow.findMany({
                    where: {
                        reportId: report.id
                    }
                });
                reports.push({
                    ...report,
                    reportRows: [...reportRows]
                });
            }
            return reports;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(id) {
        try {
            const res = await this.databaseService.report.findFirst({
                where: {
                    id
                }
            });
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findMyReports(id) {
        try {
            const res = await this.databaseService.report.findMany({
                where: {
                    authorId: id
                }
            });
            const reports = [];
            for await (let report of res) {
                const reportRows = await this.databaseService.reportRow.findMany({
                    where: {
                        reportId: report.id
                    }
                });
                reports.push({
                    ...report,
                    reportRows: [...reportRows]
                });
            }
            return reports;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async update(id, dto) {
        try {
            const res = await this.databaseService.report.update({
                where: {
                    id
                },
                data: {
                    ...dto
                }
            });
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async remove(id) {
        try {
            const res = await this.databaseService.report.delete({
                where: {
                    id
                }
            });
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReportService);
//# sourceMappingURL=report.service.js.map