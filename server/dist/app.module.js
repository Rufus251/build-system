"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const database_module_1 = require("./database/database.module");
const role_module_1 = require("./role/role.module");
const object_module_1 = require("./object/object.module");
const report_data_type_module_1 = require("./report-data-type/report-data-type.module");
const report_module_1 = require("./report/report.module");
const report_row_module_1 = require("./report-row/report-row.module");
const auth_module_1 = require("./auth/auth.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '../../client/dist'),
            }), auth_module_1.AuthModule, user_module_1.UserModule, database_module_1.DatabaseModule, role_module_1.RoleModule, object_module_1.ObjectModule, report_data_type_module_1.ReportDataTypeModule, report_module_1.ReportModule, report_row_module_1.ReportRowModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map