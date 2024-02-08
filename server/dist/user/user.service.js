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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(dto, roleId) {
        try {
            const hashPass = await bcrypt.hash(dto.password, 7);
            dto.password = hashPass;
            const res = await this.databaseService.user.create({
                data: {
                    ...dto,
                    RoleOnUser: {
                        create: {
                            role: {
                                connect: {
                                    id: roleId
                                }
                            }
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
            const resUsers = await this.databaseService.user.findMany();
            const users = [];
            for await (let user of resUsers) {
                const userRole = await this.databaseService.role.findMany({
                    where: {
                        RoleOnUser: {
                            some: {
                                userId: user.id
                            }
                        }
                    }
                });
                users.push({ ...user, 'role': userRole[0].name });
            }
            return users;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOne(id) {
        try {
            const res = await this.databaseService.user.findFirst({
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
    async update(userId, roleId, dto) {
        try {
            const res = await this.databaseService.user.update({
                where: {
                    id: userId
                },
                data: {
                    ...dto,
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
            const res = await this.databaseService.user.delete({
                where: {
                    id
                }
            });
            return res;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException("Internal", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map