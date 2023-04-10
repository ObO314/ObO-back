import {
  UserAuthorizeOutboundPort,
  UserAuthorizeOutboundPortInputDto,
  UserAuthorizeOutboundPortOutputDto,
} from '../outbound-port/user.validate.outbound-port';
import {
  UserLoginOutboundPort,
  UserLoginOutboundPortInputDto,
  UserLoginOutboundPortOutputDto,
} from './../outbound-port/user.login.outbound-port';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UserSignUpOutboundPortInputDto,
  UserSignUpOutboundPortOutputDto,
  UserSignUpOutboundPort,
} from '../outbound-port/user.sign-up.outbound-port';
import { Users } from 'src/database/entities/Users';

export class UserRepository
  implements
    UserSignUpOutboundPort,
    UserLoginOutboundPort,
    UserAuthorizeOutboundPort
{
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  async signUp(
    params: UserSignUpOutboundPortInputDto,
  ): Promise<UserSignUpOutboundPortOutputDto> {
    const exisitedMember = await this.usersRepository.findOne({
      email: params.email,
    });

    if (exisitedMember) {
      throw new HttpException(
        '이미 존재하는 이메일 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const bcryptedPW = await bcrypt.hash(params.password, 10);
    this.usersRepository.create({
      email: params.email,
      password: bcryptedPW,
      nickname: params.nickname,
    });

    const newUser = await this.usersRepository.findOne({ email: params.email });
    return newUser;
  }

  async login(
    params: UserLoginOutboundPortInputDto,
  ): Promise<UserLoginOutboundPortOutputDto> {
    const findUser = await this.usersRepository.findOne({
      email: params.email,
    });
    const checkPw = bcrypt.compare(params.password, findUser.password);
    if (!checkPw) {
      throw new UnauthorizedException();
    } else {
      return findUser;
    }
  }

  async validate(
    params: UserAuthorizeOutboundPortInputDto,
  ): Promise<UserAuthorizeOutboundPortOutputDto> {
    const findUser = await this.usersRepository.findOne({
      userId: params.userId,
    });
    return findUser;
  }
}
