import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login.inbound-port';
import { UserRepository } from './outbound-adapter/user.repository';
import { USER_SIGN_UP_INBOUND_PORT } from './inbound-port/user.sign-up.inbound-port';
import { USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT } from './outbound-port/user.sign-up.outbound-repository-port';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from 'src/database/entities/Users';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategy/auth.jwt.strategy';
import { USER_LOGIN_OUTBOUND_REPOSITORY_PORT } from './outbound-port/user.login.outbound-repository-port';
import { USER_LOGIN_OUTBOUND_TOKEN_PORT } from './outbound-port/user.login.outbound-token-port';
import { JwtModule } from '@nestjs/jwt';
import { UserLoginService } from './service/user.login.service';
import { UserSignUpService } from './service/user.sign-up.service';
import { USER_READ_INBOUND_PORT } from './inbound-port/user.read.inbound-port';
import { UserReadService } from './service/user.read.service';
import { USER_READ_OUTBOUND_PORT } from './outbound-port/user.read.outbound-port';
import { USER_UPDATE_INBOUND_PORT } from './inbound-port/user.update.inbound-port';
import { UserUpdateService } from './service/user.update.service';
import { USER_UPDATE_OUTBOUND_PORT } from './outbound-port/user.update.outbound-port';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SIGN_UP_INBOUND_PORT,
      useClass: UserSignUpService,
    },
    {
      provide: USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT,
      useClass: UserRepository,
    },

    {
      provide: USER_LOGIN_INBOUND_PORT,
      useClass: UserLoginService,
    },
    {
      provide: USER_LOGIN_OUTBOUND_REPOSITORY_PORT,
      useClass: UserRepository,
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

    {
      provide: USER_LOGIN_OUTBOUND_TOKEN_PORT,
      useClass: JwtStrategy,
    },
  ],
})
export class UserModule {}
