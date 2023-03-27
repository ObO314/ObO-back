import { InjectRepository } from '@mikro-orm/nestjs';
import {
  SignUpOutboundPort,
  SignUpOutboundPortInputDto,
  SignUpOutboundPortOutputDto,
} from '../outbound-port/sign-up.outbound-port';
import { Users } from '../../database/entities/Users';
import { EntityRepository } from '@mikro-orm/postgresql';

export class SignUpRepository implements SignUpOutboundPort {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  async execute(
    params: SignUpOutboundPortInputDto,
  ): Promise<SignUpOutboundPortOutputDto> {
    const members = await this.usersRepository.findOne({
      userId: params.userId,
    });
    console.log(params);
    console.log(members);
    return members.nickname;
  }
}
