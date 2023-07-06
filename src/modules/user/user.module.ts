import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login.inbound-port';
import { USER_READ_INBOUND_PORT } from './inbound-port/user.read.inbound-port';
import { USER_LOGOUT_INBOUND_PORT } from './inbound-port/user.logout.inbound-port';
import { USER_SIGN_UP_INBOUND_PORT } from './inbound-port/user.sign-up.inbound-port';
import { USER_UPDATE_INBOUND_PORT } from './inbound-port/user.update.inbound-port';
import { USER_UPDATE_OUTBOUND_PORT } from './outbound-port/user.update.outbound-port';
import { USER_READ_OUTBOUND_PORT } from './outbound-port/user.read.outbound-port';
import { USER_CREATE_TOKENS_OUTBOUND_PORT } from './outbound-port/user.create-tokens.outbound-port';
import { USER_DELETE_REFRESH_TOKEN_OUTBOUND_PORT } from './outbound-port/user.delete-refresh-token.outbound-port';
import { USER_CREATE_OUTBOUND_PORT } from './outbound-port/user.create.outbound-port';
import { UserController } from './controller/user.controller';
import { UserLoginService } from './service/user.login.service';
import { UserReadService } from './service/user.read.service';
import { UserUpdateService } from './service/user.update.service';
import { UserSignUpService } from './service/user.sign-up.service';
import { UserLogoutService } from './service/user.logout.service';
import { JwtStrategy } from '../auth/strategy/auth.jwt.strategy';
import { UserCreateRepository } from './outbound-adapter/user.create.repository';
import { UserDeleteRefreshTokenRepository } from './outbound-adapter/user.delete-refresh-token.repository';
import { UserReadRepository } from './outbound-adapter/user.read.repository';
import { UserUpdateRepository } from './outbound-adapter/user.update.repository';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    //--- inbound ---
    {
      provide: USER_LOGIN_INBOUND_PORT,
      useClass: UserLoginService,
    },
    {
      provide: USER_LOGOUT_INBOUND_PORT,
      useClass: UserLogoutService,
    },
    {
      provide: USER_READ_INBOUND_PORT,
      useClass: UserReadService,
    },
    {
      provide: USER_SIGN_UP_INBOUND_PORT,
      useClass: UserSignUpService,
    },
    {
      provide: USER_UPDATE_INBOUND_PORT,
      useClass: UserUpdateService,
    },

    //--- outbound ---
    {
      provide: USER_CREATE_TOKENS_OUTBOUND_PORT,
      useClass: JwtStrategy,
    },
    {
      provide: USER_CREATE_OUTBOUND_PORT,
      useClass: UserCreateRepository,
    },
    {
      provide: USER_DELETE_REFRESH_TOKEN_OUTBOUND_PORT,
      useClass: UserDeleteRefreshTokenRepository,
    },
    {
      provide: USER_READ_OUTBOUND_PORT,
      useClass: UserReadRepository,
    },
    {
      provide: USER_UPDATE_OUTBOUND_PORT,
      useClass: UserUpdateRepository,
    },
  ],
})
export class UserModule {}
