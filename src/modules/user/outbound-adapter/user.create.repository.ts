import { Injectable } from '@nestjs/common';
import {
  UserCreateOutboundPort,
  UserCreateOutboundPortInputDto,
  UserCreateOutboundPortOutputDto,
} from '../outbound-port/user.create.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';

@Injectable()
export class UserCreateRepository implements UserCreateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: UserCreateOutboundPortInputDto,
  ): Promise<UserCreateOutboundPortOutputDto> {
    const newUser = this.em.create(Users, params);
    await this.em.persistAndFlush(newUser);
    return newUser;
  }
}
