import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import {
  AuthFindUserOutboundPort,
  AuthFindUserOutboundPortInputDto,
  AuthFindUserOutboundPortOutputDto,
} from '../outbound-port/auth.find-user.outbound-port';

@Injectable()
export class AuthFindUserRepository implements AuthFindUserOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: AuthFindUserOutboundPortInputDto,
  ): Promise<AuthFindUserOutboundPortOutputDto> {
    const newUser = this.em.create(Users, params);
    await this.em.persistAndFlush(newUser);
    return newUser;
  }
}
