import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UserSignUpOutboundRepositoryPort,
  UserSignUpOutboundRepositoryPortInputDto,
  UserSignUpOutboundRepositoryPortOutputDto,
} from '../outbound-port/user.sign-up.outbound-repository-port';
import { Users } from 'src/database/entities/Users';
import {
  UserLoginOutboundRepositoryPort,
  UserLoginOutboundRepositoryPortInputDto,
  UserLoginOutboundRepositoryPortOutputDto,
} from '../outbound-port/user.login.outbound-repository-port';
import { pipe, tap } from '@fxts/core';
import {
  executeAndThrowHttpError,
  executeOrThrowHttpError,
} from 'src/utilities/executeOrThrowError';
import { findInRepository } from 'src/utilities/findInRepository';

export class UserRepository
  implements UserSignUpOutboundRepositoryPort, UserLoginOutboundRepositoryPort
{
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  //create
  async signUp(
    params: UserSignUpOutboundRepositoryPortInputDto,
  ): Promise<UserSignUpOutboundRepositoryPortOutputDto> {
    const findUserOrError = executeAndThrowHttpError(
      findInRepository(this.usersRepository),
      '이미 가입된 이메일입니다.',
      'email',
    );

    console.log('here');
    return pipe(
      params,
      tap(({ email }) => findUserOrError(email)),
      tap(async (params) => {
        params.password = await bcrypt.hash(params.password, 10);
      }),
      tap((user) => {
        this.usersRepository.create(user, { persist: true });
      }),
      (params) => this.usersRepository.findOne({ email: params.email }),
    );
  }

  //read
  async findUserId(
    params: UserLoginOutboundRepositoryPortInputDto,
  ): Promise<UserLoginOutboundRepositoryPortOutputDto> {
    return pipe(
      params,
      async ({ email }) => await this.usersRepository.findOne({ email: email }),
      (user) => {
        return { userId: user.userId };
      },
    );
  }
}
