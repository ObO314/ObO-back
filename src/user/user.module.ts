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
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    AuthModule,
    PassportModule,
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
  ],
})
export class UserModule {}
