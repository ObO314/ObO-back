import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { pipe, tap } from '@fxts/core';
import {
  AuthLocalStrategyOutboundPort,
  AuthLocalStrategyOutboundPortInputDto,
  AuthLocalStrategyOutboundPortOutputDto,
} from '../outbound-port/auth.local.strategy.outbound-port';
import { Users } from 'src/database/entities/Users';
import { AuthGoogleStrategyOutboundSignUpPortInputDto } from '../outbound-port/auth.google.strategy.outbound-port';

@Injectable()
export class AuthRepository implements AuthLocalStrategyOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async findUser(
    params: AuthLocalStrategyOutboundPortInputDto,
  ): Promise<AuthLocalStrategyOutboundPortOutputDto> {
    return await this.em.findOne(Users, params);
  }

  async signUp(
    params: AuthGoogleStrategyOutboundSignUpPortInputDto,
  ): Promise<Users> {
    const newUser = this.em.create(Users, params);
    await this.em.persistAndFlush(newUser);
    return newUser;
  }
}
