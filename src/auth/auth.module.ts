import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { Users } from 'src/database/entities/Users';
import { LocalAuthGuard } from './guard/auth.local.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/auth.jwt.strategy';
import { DynamicAuthGuard } from './guard/auth.dynamic.guard';
import { GoogleAuthGuard } from './guard/auth.google.guard';
import { LocalStrategy } from './strategy/auth.local.strategy';
import { GoogleStrategy } from './strategy/auth.google.strategy';

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
    LocalStrategy,
    LocalAuthGuard,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
  exports: [
    PassportModule,
    JwtModule,
    JwtStrategy,
    DynamicAuthGuard,
    LocalStrategy,
    LocalAuthGuard,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
})
export class AuthModule {}
