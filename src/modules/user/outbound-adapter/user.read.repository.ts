import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import {
  UserReadOutboundPort,
  UserReadOutboundPortInputDto,
  UserReadOutboundPortOutputDto,
} from '../outbound-port/user.read.outbound-port';
import { Users } from 'src/database/entities/Users';

@Injectable()
export class UserReadRepository implements UserReadOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: UserReadOutboundPortInputDto,
  ): Promise<UserReadOutboundPortOutputDto> {
    return await this.em.findOne(Users, params);
  }
}
