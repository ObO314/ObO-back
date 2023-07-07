import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import {
  CircleMemberFindOutboundPort,
  CircleMemberFindOutboundPortInputDto,
  CircleMemberFindOutboundPortOutputDto,
} from '../outbound-port/circle.member.find.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';

@Injectable()
export class CircleMemberFindRepository
  implements CircleMemberFindOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberFindOutboundPortInputDto,
  ): Promise<CircleMemberFindOutboundPortOutputDto> {
    return await this.em.findOne(UsersCircles, {
      circle: params.circleId,
      user: params.userId,
    });
  }
}
