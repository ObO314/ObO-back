import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  HttpException,
  HttpStatus,
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

export class UserRepository implements AuthLocalStrategyOutboundPort {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  async findUser(
    params: AuthLocalStrategyOutboundPortInputDto,
  ): Promise<AuthLocalStrategyOutboundPortOutputDto> {
    return await executeOrThrowError(
      (params) => this.usersRepository.findOne(params),
      '계정이 존재하지 않습니다.',
    )(params);
  }
}
