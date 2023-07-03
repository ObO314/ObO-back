import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import {
  CircleMemberCreateOutboundPort,
  CircleMemberCreateOutboundPortInputDto,
  CircleMemberCreateOutboundPortOutputDto,
} from '../outbound-port/circle.member.create.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';

@Injectable()
export class CircleMemberCreateRepository
  implements CircleMemberCreateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberCreateOutboundPortInputDto,
  ): Promise<CircleMemberCreateOutboundPortOutputDto> {
    const newMember = await this.em.create(UsersCircles, {
      user: params.userId,
      circle: params.circleId,
    });
    await this.em.persistAndFlush(newMember);
    return newMember;
  }
}
