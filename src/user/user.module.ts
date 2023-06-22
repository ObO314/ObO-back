import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login.inbound-port';
import { UserRepository } from './outbound-adapter/user.repository';
import { USER_SIGN_UP_LOCAL_INBOUND_PORT } from './inbound-port/user.sign-up-local.inbound-port';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategy/auth.jwt.strategy';
import { USER_LOGIN_OUTBOUND_PORT } from './outbound-port/user.login.outbound-port';
import { UserLoginService } from './service/user.login.service';
import { UserSignUpLocalService } from './service/user.sign-up-local.service';
import { USER_READ_INBOUND_PORT } from './inbound-port/user.read.inbound-port';
import { UserReadService } from './service/user.read.service';
import { USER_READ_OUTBOUND_PORT } from './outbound-port/user.read.outbound-port';
import { USER_UPDATE_INBOUND_PORT } from './inbound-port/user.update.inbound-port';
import { UserUpdateService } from './service/user.update.service';
import { USER_UPDATE_OUTBOUND_PORT } from './outbound-port/user.update.outbound-port';
import { USER_SIGN_UP_SOCIAL_INBOUND_PORT } from './inbound-port/user.sign-up-social.inbound-port';
import { UserSignUpSocialService } from './service/user.sign-up-social.service';
import { USER_SIGN_UP_SOCIAL_OUTBOUND_PORT } from './outbound-port/user.sign-up-social.outbound-port';
import { USER_SIGN_UP_LOCAL_OUTBOUND_PORT } from './outbound-port/user.sign-up-local.outbound-port';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SIGN_UP_LOCAL_INBOUND_PORT,
      useClass: UserSignUpLocalService,
    },
    {
      provide: USER_SIGN_UP_LOCAL_OUTBOUND_PORT,
      useClass: UserRepository,
    },

    {
      provide: USER_SIGN_UP_SOCIAL_INBOUND_PORT,
      useClass: UserSignUpSocialService,
    },
    {
      provide: USER_SIGN_UP_SOCIAL_OUTBOUND_PORT,
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

    {
      provide: USER_READ_INBOUND_PORT,
      useClass: UserReadService,
    },
    {
      provide: USER_READ_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    {
      provide: USER_UPDATE_INBOUND_PORT,
      useClass: UserUpdateService,
    },
    {
      provide: USER_UPDATE_OUTBOUND_PORT,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
