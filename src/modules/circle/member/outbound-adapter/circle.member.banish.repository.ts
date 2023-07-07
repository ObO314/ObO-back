import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

import { UsersCircles } from 'src/database/entities/UsersCircles';
import {
  CircleMemeberBanishOutboundPort,
  CircleMemeberBanishOutboundPortInputDto,
  CircleMemeberBanishOutboundPortOutputDto,
} from '../outbound-port/circle.member.banish.outbount-port';

@Injectable()
export class CircleMemberBanishRepository
  implements CircleMemeberBanishOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemeberBanishOutboundPortInputDto,
  ): Promise<CircleMemeberBanishOutboundPortOutputDto> {
    const toBanishMember = await this.em.findOne(UsersCircles, {
      user: params.userId,
      circle: params.circleId,
    });
    await this.em.removeAndFlush(toBanishMember);
    return toBanishMember;
  }
}
