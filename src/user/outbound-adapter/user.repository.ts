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
  UserSignUpLocalOutboundPort,
  UserSignUpLocalOutboundPortInputDto,
  UserSignUpLocalOutboundPortOutputDto,
} from '../outbound-port/user.sign-up-local.outbound-port';
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
import {
  UserSignUpSocialOutboundPort,
  UserSignUpSocialOutboundPortInputDto,
  UserSignUpSocialOutboundPortOutputDto,
} from '../outbound-port/user.sign-up-social.outbound-port';

@Injectable()
export class UserRepository
  implements
    UserSignUpLocalOutboundPort,
    UserSignUpSocialOutboundPort,
    UserLoginOutboundRepositoryPort,
    UserReadOutboundPort,
    UserUpdateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  //create
  async signUpLocal(
    params: UserSignUpLocalOutboundPortInputDto,
  ): Promise<UserSignUpLocalOutboundPortOutputDto> {
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
        this.em.persistAndFlush(Users);
      }),
      (params) => this.em.findOne(Users, { email: params.email }),
    );
  }

  async signUpSocial(
    params: UserSignUpSocialOutboundPortInputDto,
  ): Promise<UserSignUpSocialOutboundPortOutputDto> {
    //
    const findUserOrError = executeAndThrowError(
      (email) => this.em.findOne(Users, { email }),
      '이미 가입된 소셜 계정입니다.',
    );

    return await pipe(
      params,
      tap(({ email }) => findUserOrError(email)),
      tap((user) => {
        this.em.create(Users, user);
        this.em.persistAndFlush(Users);
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
    const user = await this.em.findOne(Users, params);
    return {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImg: user.authMethod || process.env.PRODUCT_DEFAULT_IMAGE,
      progressRoutine: user.progressRoutine || 0,
      progressTodo: user.progressRoutine || 0,
      progressWork: user.progressWork || 0,
    };
  }

  async update(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto> {
    const user = await this.em.findOne(Users, {
      userId: params.userId,
    });
    this.em.assign(user, {
      nickname: params.nickname,
      profileImg: params.profileImg || null,
    });
    await this.em.persistAndFlush(user);

    return {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      profileImg: user.profileImg || process.env.PRODUCT_DEFAULT_IMAGE,
      progressRoutine: user.progressRoutine || 0,
      progressTodo: user.progressTodo || 0,
      progressWork: user.progressWork || 0,
    };
  }
}
