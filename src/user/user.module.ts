import { USER_LOGIN_OUTBOUND_PORT } from './outbound-port/user.login.outbound-port';
import { UserLoginService } from './service/user.login.service';
import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login-inbound-port';
import { UserRepository } from './outbound-adapter/user.repository';
import { USER_SIGN_UP_INBOUND_PORT } from './inbound-port/user.sign-up.inbound-port';
import { USER_SIGN_UP_OUTBOUND_PORT } from './outbound-port/user.sign-up.outbound-port';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from 'src/database/entities/Users';
import { UserSignUpService } from './service/user.sign-up.service';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt/strategy/auth.jwt.strategy';
import { AUTH_JWT_INBOUND_PORT } from 'src/auth/jwt/inbound-port/auth.jwt.inbound-port';

@Module({
  imports: [MikroOrmModule.forFeature([Users]), AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SIGN_UP_INBOUND_PORT,
      useClass: UserSignUpService,
    },
    {
      provide: USER_SIGN_UP_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    {
      provide: USER_LOGIN_INBOUND_PORT,
      useClass: UserLoginService,
    },
    {
      provide: USER_LOGIN_OUTBOUND_PORT,
      useClass: JwtStrategy,
    },
  ],
})
export class UserModule {}
