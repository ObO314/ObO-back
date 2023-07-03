import { Injectable } from '@nestjs/common';
import {
  CircleMemeberUpdateCircleOutboundPort,
  CircleMemeberUpdateCircleOutboundPortInputDto,
  CircleMemeberUpdateCircleOutboundPortOutputDto,
} from '../outbound-port/circle.member.update-circle.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { UsersCircles } from 'src/database/entities/UsersCircles';
import { Circles } from 'src/database/entities/Circles';

@Injectable()
export class CircleMemberUpdateCircleRepository
  implements CircleMemeberUpdateCircleOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemeberUpdateCircleOutboundPortInputDto,
  ): Promise<CircleMemeberUpdateCircleOutboundPortOutputDto> {
    const toUpdateCircle = await this.em.findOne(Circles, {
      id: params.circleId,
    });
    await this.em.upsert(Circles, {
      id: params.circleId,
      members: String(Number(toUpdateCircle.members) + params.member),
    });
    await this.em.flush();
    return toUpdateCircle;
  }
}
