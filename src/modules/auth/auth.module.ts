import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'src/database/entities/Users';
import { AuthLocalGuard } from './guard/auth.local.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtStrategy } from './strategy/auth.jwt.strategy';
import { DynamicAuthGuard } from './guard/auth.dynamic.guard';
import { AuthGoogleGuard } from './guard/auth.google.guard';
import { AuthLocalStrategy } from './strategy/auth.local.strategy';
import { AuthGoogleStrategy } from './strategy/auth.google.strategy';
import { AUTH_LOCAL_STRATEGY_INBOUND_PORT } from './inbound-port/auth.local.strategy.inbound-port';
import { AUTH_GOOGLE_STRATEGY_INBOUND_PORT } from './inbound-port/auth.google.strategy.inbound-port';
import { AUTH_JWT_INBOUND_PORT } from './inbound-port/auth.jwt.strategy.inbound-port';
import { AUTH_CREATE_USER_OUTBOUND_PORT } from './outbound-port/auth.create-user.outbound-port';
import { AUTH_FIND_REFRESH_TOKEN_OUTBOUND_PORT } from './outbound-port/auth.find-refresh-token.outbound-port';
import { AUTH_FIND_USER_OUTBOUND_PORT } from './outbound-port/auth.find-user.outbound-port';
import { AUTH_SAVE_REFRESH_TOKEN_OUTBOUND_PORT } from './outbound-port/auth.save-refresh-token.outbound-port';
import { AuthCreateUserRepository } from './outbound-adapter/auth.create-user.repository';
import { AuthFindRefreshTokenRepository } from './outbound-adapter/auth.find-refresh-token.repository';
import { AuthFindUserRepository } from './outbound-adapter/auth.find-user.repository';
import { AuthSaveRefreshTokenRepository } from './outbound-adapter/auth.save-refresh-token.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
    }),
    PassportModule,
  ],
  providers: [
    AuthJwtStrategy,
    DynamicAuthGuard,
    AuthLocalStrategy,
    AuthLocalGuard,
    AuthGoogleStrategy,
    AuthGoogleGuard,
    {
      provide: AUTH_LOCAL_STRATEGY_INBOUND_PORT,
      useClass: AuthLocalStrategy,
    },
    {
      provide: AUTH_JWT_INBOUND_PORT,
      useClass: AuthJwtStrategy,
    },
    {
      provide: AUTH_GOOGLE_STRATEGY_INBOUND_PORT,
      useClass: AuthGoogleStrategy,
    },

    // --- outbound ---
    {
      provide: AUTH_CREATE_USER_OUTBOUND_PORT,
      useClass: AuthCreateUserRepository,
    },
    {
      provide: AUTH_FIND_REFRESH_TOKEN_OUTBOUND_PORT,
      useClass: AuthFindRefreshTokenRepository,
    },
    {
      provide: AUTH_FIND_USER_OUTBOUND_PORT,
      useClass: AuthFindUserRepository,
    },
    {
      provide: AUTH_SAVE_REFRESH_TOKEN_OUTBOUND_PORT,
      useClass: AuthSaveRefreshTokenRepository,
    },
  ],
  exports: [
    PassportModule,
    JwtModule,
    AuthJwtStrategy,
    DynamicAuthGuard,
    AuthLocalStrategy,
    AuthLocalGuard,
    AuthGoogleStrategy,
    AuthGoogleGuard,
  ],
})
export class AuthModule {}
