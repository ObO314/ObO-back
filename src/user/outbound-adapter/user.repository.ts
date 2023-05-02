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
      authMethod: params.authMethod,
    });

    const newUser = await this.usersRepository.findOne({ email: params.email });
    return newUser;
  }

  async findUserId(
    params: UserLoginOutboundRepositoryPortInputDto,
  ): Promise<UserLoginOutboundRepositoryPortOutputDto> {
    const userId = (await this.usersRepository.findOne({ email: params.email }))
      .userId;
    return { userId: userId };
  }
}
