import { USER_AUTHORIZE_OUTBOUND_PORT } from './outbound-port/user.validate.outbound-port';
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
import { UserAuthorizeService } from './service/user.validate.service';
import { USER_AUTHORIZE_INBOUND_PORT } from './inbound-port/user.validate.inbound-port';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'OBO_SECRET_KEY_314',
      //process.env.JWT_SECRETKEY ??
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
  exports: [USER_AUTHORIZE_INBOUND_PORT, PassportModule],
  //PassportModule 을 사용해서 UserAuthorizeService 를 구성했으므로 둘 다 같이 추출해야함.
})
export class UserModule {}
