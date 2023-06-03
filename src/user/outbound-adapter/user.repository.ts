import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import {
  HttpException,
  HttpStatus,
  Injectable,
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
import { executeAndThrowError } from 'src/utilities/executeThrowError';

@Injectable()
export class UserRepository
  implements UserSignUpOutboundRepositoryPort, UserLoginOutboundRepositoryPort
{
  constructor(private readonly em: EntityManager) {}

  //create
  async signUp(
    params: UserSignUpOutboundRepositoryPortInputDto,
  ): Promise<UserSignUpOutboundRepositoryPortOutputDto> {
    //
    const findUserOrError = executeAndThrowError(
      (email) => this.em.findOne(Users, { email }),
      '이미 가입된 이메일입니다.',
    );

    return await pipe(
      params,
      tap(({ email }) => findUserOrError(email)),
      tap(async (params) => {
        params.password = await bcrypt.hash(params.password, 10);
      }),
      tap((user) => {
        this.em.create(Users, user);
      }),
      (params) => this.em.findOne(Users, { email: params.email }),
    );
  }

  //read
  async findUserId(
    params: UserLoginOutboundRepositoryPortInputDto,
  ): Promise<UserLoginOutboundRepositoryPortOutputDto> {
    console.log(params);
    return pipe(
      params,
      async ({ email }) => await this.em.findOne(Users, { email }),
      (user) => {
        return { userId: user.userId };
      },
    );
  }
}
