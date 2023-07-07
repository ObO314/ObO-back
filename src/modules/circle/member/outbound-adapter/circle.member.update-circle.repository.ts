import { Injectable } from '@nestjs/common';
import {
  CircleMemberUpdateCircleOutboundPort,
  CircleMemberUpdateCircleOutboundPortInputDto,
  CircleMemberUpdateCircleOutboundPortOutputDto,
} from '../outbound-port/circle.member.update-circle.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { UsersCircles } from 'src/database/entities/UsersCircles';
import { Circles } from 'src/database/entities/Circles';

@Injectable()
export class CircleMemberUpdateCircleRepository
  implements CircleMemberUpdateCircleOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberUpdateCircleOutboundPortInputDto,
  ): Promise<CircleMemberUpdateCircleOutboundPortOutputDto> {
    const toUpdateCircle = await this.em.findOne(Circles, {
      id: params.circleId,
    });
    await this.em.upsert(Circles, {
      id: params.circleId,
      members: String(Number(toUpdateCircle.members) + params.members),
    });
    await this.em.flush();
    return toUpdateCircle;
  }
}
