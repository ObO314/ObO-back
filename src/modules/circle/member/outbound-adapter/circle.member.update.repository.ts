import { Injectable } from '@nestjs/common';
import {
  CircleMemberUpdateOutboundPort,
  CircleMemberUpdateOutboundPortInputDto,
  CircleMemberUpdateOutboundPortOutputDto,
} from '../outbound-port/circle.member.update.outbound-port';
import { EntityManager } from '@mikro-orm/knex';
import { UsersCircles } from 'src/database/entities/UsersCircles';

@Injectable()
export class CircleMemberUpdateRepository
  implements CircleMemberUpdateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberUpdateOutboundPortInputDto,
  ): Promise<CircleMemberUpdateOutboundPortOutputDto> {
    const gradeMember = await this.em.upsert(UsersCircles, {
      user: params.memberId,
      circle: params.circleId,
      grade: params.grade,
    });
    await this.em.flush();
    return gradeMember;
  }
}
