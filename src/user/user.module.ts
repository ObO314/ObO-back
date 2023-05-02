import { UserLoginService } from './service/user.login.service';
import { USER_LOGIN_INBOUND_PORT } from './inbound-port/user.login.inbound-port';
import { UserRepository } from './outbound-adapter/user.repository';
import { USER_SIGN_UP_INBOUND_PORT } from './inbound-port/user.sign-up.inbound-port';
import { USER_SIGN_UP_OUTBOUND_REPOSITORY_PORT } from './outbound-port/user.sign-up.outbound-repository-port';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from 'src/database/entities/Users';
import { UserSignUpService } from './service/user.sign-up.service';
import { UserController } from './controller/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategy/auth.jwt.strategy';
import { USER_LOGIN_OUTBOUND_REPOSITORY_PORT } from './outbound-port/user.login.outbound-repository-port';
import { USER_LOGIN_OUTBOUND_TOKEN_PORT } from './outbound-port/user.login.outbound-token-port';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([Users]), AuthModule],
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
      provide: USER_LOGIN_OUTBOUND_TOKEN_PORT,
      useClass: JwtStrategy,
    },
  ],
})
export class UserModule {}
