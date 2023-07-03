import { EntityManager } from '@mikro-orm/knex';
import {
  CircleMemberApplyOutboundPort,
  CircleMemberApplyOutboundPortInputDto,
  CircleMemberApplyOutboundPortOutputDto,
} from '../outbound-port/circle.member.apply.outbound-port';
import { Injectable } from '@nestjs/common';
import { Circles } from 'src/database/entities/Circles';
import { CircleApplication } from 'src/database/entities/CircleApplication';

@Injectable()
export class CircleMemberApplyRepository
  implements CircleMemberApplyOutboundPort
{
  constructor(private readonly em: EntityManager) {}
  async execute(
    params: CircleMemberApplyOutboundPortInputDto,
  ): Promise<CircleMemberApplyOutboundPortOutputDto> {
    const application = await this.em.upsert(CircleApplication, {
      circle: params.circleId,
      user: params.userId,
    });
    await this.em.flush();
    return application;
  }
}
