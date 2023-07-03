import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import {
  CircleMemeberFindOutboundPort,
  CircleMemeberFindOutboundPortInputDto,
  CircleMemeberFindOutboundPortOutputDto,
} from '../outbound-port/circle.member.find.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';

@Injectable()
export class CircleMemberFindRepository
  implements CircleMemeberFindOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemeberFindOutboundPortInputDto,
  ): Promise<CircleMemeberFindOutboundPortOutputDto> {
    return await this.em.findOne(UsersCircles, {
      circle: params.circleId,
      user: params.userId,
    });
  }
}
