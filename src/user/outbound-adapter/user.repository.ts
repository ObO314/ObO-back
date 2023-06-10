import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UserSignUpLocalOutboundPort,
  UserSignUpLocalOutboundPortInputDto,
  UserSignUpLocalOutboundPortOutputDto,
} from '../outbound-port/user.sign-up-local.outbound-port';
import { Users } from '../../database/entities/Users';
import { pipe, tap } from '@fxts/core';
import {
  executeAndThrowError,
  executeOrThrowError,
} from '../../utilities/executeThrowError';
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
    UserReadOutboundPort,
    UserUpdateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  //create
  async signUpLocal(
    params: UserSignUpLocalOutboundPortInputDto,
  ): Promise<UserSignUpLocalOutboundPortOutputDto> {
    //
    const findUserAndError = executeAndThrowError(
      (email: string, authMethod: string) =>
        this.em.findOne(Users, { email, authMethod }),
      '이미 가입된 이메일입니다.',
    );
    try {
      return await pipe(
        params,
        tap(({ email, authMethod }) => findUserAndError(email, authMethod)),
        tap(async (params) => {
          params.password = await bcrypt.hash(params.password, 10);
        }),
        tap((user) => {
          this.em.create(Users, user);
          this.em.persistAndFlush(Users);
        }),
        (params) =>
          this.em.findOne(Users, {
            email: params.email,
            authMethod: params.authMethod,
          }),
      );
    } catch (err) {
      throw err;
    }
  }

  async signUpSocial(
    params: UserSignUpSocialOutboundPortInputDto,
  ): Promise<UserSignUpSocialOutboundPortOutputDto> {
    //
    const findUserAndError = executeAndThrowError(
      (email: string, authMethod: string) =>
        this.em.findOne(Users, { email, authMethod }),
      '이미 가입된 소셜 계정입니다.',
    );

    return await pipe(
      params,
      tap(({ email, authMethod }) => findUserAndError(email, authMethod)),
      tap((user) => {
        this.em.create(Users, user);
        this.em.persistAndFlush(Users);
      }),
      (params) =>
        this.em.findOne(Users, {
          email: params.email,
          authMethod: params.authMethod,
        }),
    );
  }

  async read(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto> {
    const findUserOrError = executeOrThrowError(
      (params) => this.em.findOne(Users, { userId: params.userId }),
      '존재하지 않는 사용자 입니다.',
    );
    try {
      const user = await findUserOrError(params);
      return {
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        profileImg: user.profileImg || process.env.PRODUCT_DEFAULT_IMAGE,
        progressRoutine: user.progressRoutine || 0,
        progressTodo: user.progressRoutine || 0,
        progressWork: user.progressWork || 0,
      };
    } catch (e) {
      throw e;
    }
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
