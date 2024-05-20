import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseModule, 
    PassportModule,
    JwtModule.register({
    secret: env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '3d' },
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
