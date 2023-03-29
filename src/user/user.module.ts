import { USER_AUTHORIZE_OUTBOUND_PORT } from './outbound-port/user.authorize.outbound-port';
import { USER_LOGIN_OUTBOUND_PORT } from './outbound-port/user.login.outbound-port';
import { UserLoginService } from './service/user.login.service';
import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login-inbound-port';
import { UserRepository } from './outbound-adaptor/user.repository';
import { USER_SIGN_UP_INBOUND_PORT } from './inbound-port/user.sign-up.inbound-port';
import { USER_SIGN_UP_OUTBOUND_PORT } from './outbound-port/user.sign-up.outbound-port';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Users } from 'src/database/entities/Users';
import { UserSignUpService } from './service/user.sign-up.service';
import { UserController } from './controller/user.controller';
import { UserAuthorizeService } from './service/user.authorize.service';
import { USER_AUTHORIZE_INBOUND_PORT } from './inbound-port/user.authorize.inbound-port';

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY ?? 'OBO_SECRET_KEY_314',
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
      provide: USER_AUTHORIZE_INBOUND_PORT,
      useClass: UserAuthorizeService,
    },
    {
      provide: USER_AUTHORIZE_OUTBOUND_PORT,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
