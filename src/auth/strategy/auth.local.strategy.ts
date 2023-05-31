import { EntityRepository } from '@mikro-orm/knex';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as StrategyLOCAL } from 'passport-local';
import { Users } from 'src/database/entities/Users';
import {
  AuthLocalInboundPort,
  AuthLocalInboundPortInputEmailDto,
  AuthLocalInboundPortInputPasswordDto,
  AuthLocalInboundPortOutputDto,
} from '../inbound-port/auth.local.inbound-port';
import * as bcrypt from 'bcrypt';
import { curry, filter, map, pipe, toArray, toAsync } from '@fxts/core';
import { findInRepository } from 'src/utilities/findInRepository';
import { executeOrThrowHttpError } from 'src/utilities/executeOrThrowError';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(StrategyLOCAL)
  implements AuthLocalInboundPort
{
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: AuthLocalInboundPortInputEmailDto,
    password: AuthLocalInboundPortInputPasswordDto,
  ): Promise<AuthLocalInboundPortOutputDto> {
    //
    const findUserOrError = executeOrThrowHttpError(
      findInRepository(this.usersRepository),
      '계정이 존재하지 않습니다.',
      'email',
    );
    const checkPasswordOrError = executeOrThrowHttpError(
      bcrypt.compare,
      '비밀번호가 틀렸습니다.',
      password,
    );

    return pipe(
      email,
      findUserOrError,
      (user) => user.password,
      checkPasswordOrError,
    );
  }
}
