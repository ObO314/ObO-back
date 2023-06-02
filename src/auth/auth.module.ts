import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'src/database/entities/Users';
import { AuthLocalGuard } from './guard/auth.local.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/auth.jwt.strategy';
import { DynamicAuthGuard } from './guard/auth.dynamic.guard';
import { AuthGoogleGuard } from './guard/auth.google.guard';
import { AuthLocalStrategy } from './strategy/auth.local.strategy';
import { AuthGoogleStrategy } from './strategy/auth.google.strategy';
import { AUTH_LOCAL_STRATEGY_INBOUND_PORT } from './inbound-port/auth.local.strategy.inbound-port';
import { AUTH_LOCAL_STRATEGY_OUTBOUND_PORT } from './outbound-port/auth.local.strategy.outbound-port';
import { UserRepository } from './outbound-adapter/user.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY || 'OBO_SECRET_KEY_314',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    JwtStrategy,
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
      provide: AUTH_LOCAL_STRATEGY_OUTBOUND_PORT,
      useClass: UserRepository,
    },
  ],
  exports: [
    PassportModule,
    JwtModule,
    JwtStrategy,
    DynamicAuthGuard,
    AuthLocalStrategy,
    AuthLocalGuard,
    AuthGoogleStrategy,
    AuthGoogleGuard,
  ],
})
export class AuthModule {}
