import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'src/database/entities/Users';
import { UserModule } from './../user/user.module';
import { LocalAuthGuard } from './local/guard/auth.local.guard';
import { AUTH_LOCAL_INBOUND_PORT } from './local/inbound-port/auth.local.inbound-port';
import { JwtAuthGuard } from './jwt/guard/auth.jwt.guard';
import { AUTH_JWT_INBOUND_PORT } from './jwt/inbound-port/auth.jwt.inbound-port';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    {
      provide: AUTH_LOCAL_INBOUND_PORT,
      useClass: LocalAuthGuard,
    },
    {
      provide: AUTH_JWT_INBOUND_PORT,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [
    PassportModule,
    JwtModule,
    {
      provide: AUTH_LOCAL_INBOUND_PORT,
      useClass: LocalAuthGuard,
    },
    {
      provide: AUTH_JWT_INBOUND_PORT,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
