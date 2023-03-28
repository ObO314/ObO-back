import { InjectRepository } from '@mikro-orm/nestjs';
import {
  SignUpOutboundPort,
  SignUpOutboundPortInputDto,
  SignUpOutboundPortOutputDto,
} from '../outbound-port/sign-up.outbound-port';
import { Users } from '../../database/entities/Users';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class SignUpRepository implements SignUpOutboundPort {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  async execute(
    params: SignUpOutboundPortInputDto,
  ): Promise<SignUpOutboundPortOutputDto> {
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
