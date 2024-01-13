import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient{
    async onModuleInit(){
        await this.$connect
    }

    async onModuleDesroy(){
        await this.$disconnect
    }
    
}
