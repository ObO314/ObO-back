import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Users } from 'src/database/entities/Users';
import {
  UserUpdateOutboundPort,
  UserUpdateOutboundPortInputDto,
  UserUpdateOutboundPortOutputDto,
} from '../outbound-port/user.update.outbound-port';

@Injectable()
export class UserUpdateRepository implements UserUpdateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: UserUpdateOutboundPortInputDto,
  ): Promise<UserUpdateOutboundPortOutputDto> {
    const updatedUser = await this.em.upsert(Users, {
      ...params,
      id: params.userId,
    });
    await this.em.flush();
    return updatedUser;
  }
}
