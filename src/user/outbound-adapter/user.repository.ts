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
import {
  UserReadOutboundPort,
  UserReadOutboundPortInputDto,
  UserReadOutboundPortOutputDto,
} from '../outbound-port/user.read.outbound-port';
import {
  UserUpdateOutboundPort,
  UserUpdateOutboundPortInputDto,
  UserUpdateOutboundPortOutputDto,
} from '../outbound-port/user.update.outbound-port';

@Injectable()
export class UserRepository
  implements
    UserSignUpOutboundRepositoryPort,
    UserLoginOutboundRepositoryPort,
    UserReadOutboundPort,
    UserUpdateOutboundPort
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
    return pipe(
      params,
      async (params) =>
        await this.em.findOne(Users, {
          email: params.email,
        }),
      (user) => {
        return { userId: user.userId };
      },
    );
  }

  async read(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto> {
    return { user: await this.em.findOne(Users, params) };
  }

  async update(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto> {
    const user = await this.em.findOne(Users, {
      userId: params.userId,
    });
    this.em.assign(user, {
      nickname: params.nickname,
      profileImg: params.profileImg,
    });
    await this.em.persistAndFlush(user);
    return { user: user };
  }
}
