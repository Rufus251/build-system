import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { env } from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
      constructor(private authService: AuthService) {
            super(
                  {
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                        ignoreExpiration: false,
                        secretOrKey: env.JWT_SECRET_KEY
                  }
            );
      }

      async validate(dto: LoginUserDto): Promise<any> {
            const user = await this.authService.validateUser(dto);
            return user;
      }
}