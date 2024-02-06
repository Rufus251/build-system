"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
var cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    optionSuccessStatus: 200,
    'Access-Control-Allow-Origin': '*',
    'access-control-allow-credentials': true
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.APP_PORT || 3001;
    app.setGlobalPrefix('api');
    app.use(cors(corsOptions));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Build system docs')
        .setDescription('Build system API description')
        .setVersion('1.0')
        .addTag('user')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, "0.0.0.0");
}
bootstrap();
//# sourceMappingURL=main.js.map