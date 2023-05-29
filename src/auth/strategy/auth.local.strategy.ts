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
import { filter, map, pipe, toArray, toAsync } from '@fxts/core';

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
    const findUser = await this.usersRepository.findOne({
      email: email,
    });
    // if (!findUser || findUser.authMethod != 'local') {
    //   throw new HttpException(
    //     '계정이 존재하지 않습니다.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // const checkPw = bcrypt.compare(password, findUser.password);
    // if (!checkPw) {
    //   throw new HttpException('비밀번호가 틀렸습니다.', HttpStatus.BAD_REQUEST);
    // } else {
    //   return findUser.email;
    // }

    // return pipe(
    //   email,
    //   async (email) => await this.usersRepository.findOne({ email }),
    //   (findUser) =>
    //     findUser && findUser.authMethod == 'local'
    //       ? findUser
    //       : new Error('계정이 존재하지 않습니다.'),
    //   async (findUser) => {
    //     if (findUser)
    //       return (await bcrypt.compare(password, findUser.password))
    //         ? true
    //         : new Error('비밀번호가 틀렸습니다.');
    //   },
    // );

    return pipe(
      [email],
      toAsync,
      map(async (email) => await this.usersRepository.findOne({ email })),
      filter((findUser) => findUser && findUser.authMethod == 'local'),
      filter(
        async (findUser) => await bcrypt.compare(password, findUser.password),
      ),
      toArray,
    );
  }
}
