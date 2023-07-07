import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import {
  AuthCreateUserOutboundPort,
  AuthCreateUserOutboundPortInputDto,
  AuthCreateUserOutboundPortOutputDto,
} from '../outbound-port/auth.create-user.outbound-port';

@Injectable()
export class AuthCreateUserRepository implements AuthCreateUserOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: AuthCreateUserOutboundPortInputDto,
  ): Promise<AuthCreateUserOutboundPortOutputDto> {
    const newUser = this.em.create(Users, params);
    await this.em.persistAndFlush(newUser);
    return newUser;
  }
}
