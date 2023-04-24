import { USER_VALIDATE_OUTBOUND_PORT } from './outbound-port/user.validate.outbound-port';
import { USER_LOGIN_OUTBOUND_PORT } from './outbound-port/user.login.outbound-port';
import { UserLoginService } from './service/user.login.service';
import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login-inbound-port';
import { UserRepository } from './outbound-adaptor/user.repository';
import { USER_SIGN_UP_INBOUND_PORT } from './inbound-port/user.sign-up.inbound-port';
import { USER_SIGN_UP_OUTBOUND_PORT } from './outbound-port/user.sign-up.outbound-port';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from 'src/database/entities/Users';
import { UserSignUpService } from './service/user.sign-up.service';
import { UserController } from './controller/user.controller';
import { UserValidateService } from './service/user.validate.service';
import { USER_VALIDATE_INBOUND_PORT } from './inbound-port/user.validate.inbound-port';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { USER_JWT_SERVICE_OUTBOUND_PORT } from './outbound-port/user.jwt-service.outbound-port';
import { UserJwtService } from './outbound-adaptor/user.jwt-service';

dotenv.config();

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
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
      useClass: UserRepository,
    },
    {
      provide: USER_VALIDATE_INBOUND_PORT,
      useClass: UserValidateService,
    },
    {
      provide: USER_VALIDATE_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    {
      provide: USER_JWT_SERVICE_OUTBOUND_PORT,
      useClass: UserJwtService,
    },
  ],
  exports: [USER_VALIDATE_INBOUND_PORT, PassportModule],
  //PassportModule 을 사용해서 UserAuthorizeService 를 구성했으므로 둘 다 같이 추출해야함.
})
export class UserModule {}
