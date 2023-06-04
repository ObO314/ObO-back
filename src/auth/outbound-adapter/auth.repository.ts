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
import { executeOrThrowError } from 'src/utilities/executeThrowError';

@Injectable()
export class AuthRepository implements AuthLocalStrategyOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async findUser(
    params: AuthLocalStrategyOutboundPortInputDto,
  ): Promise<AuthLocalStrategyOutboundPortOutputDto> {
    return await executeOrThrowError(
      (params) => this.em.findOne(Users, params),
      '계정이 존재하지 않습니다.',
    )(params);
  }
}
