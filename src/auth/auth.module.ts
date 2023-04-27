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
import { LocalStrategy } from './local/strategy/auth.local.strategy';
import { JwtStrategy } from './jwt/strategy/auth.jwt.strategy';

@Module({
  imports: [
    MikroOrmModule.forFeature([Users]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY || 'OBO_SECRET_KEY_314',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [JwtStrategy, LocalStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
