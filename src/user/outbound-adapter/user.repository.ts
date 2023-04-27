import {
  UserLoginOutboundPort,
  UserLoginOutboundPortInputDto,
  UserLoginOutboundPortOutputDto,
} from '../outbound-port/user.login.outbound-port';
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

export class UserRepository implements UserSignUpOutboundPort {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  //create
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
}
