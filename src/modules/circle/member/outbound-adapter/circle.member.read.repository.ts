import { EntityManager } from '@mikro-orm/knex';
import {
  CircleMemberReadOutboundPort,
  CircleMemberReadOutboundPortInputDto,
  CircleMemberReadOutboundPortOutputDto,
} from '../outbound-port/circle.member.read.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleMemberReadRepository
  implements CircleMemberReadOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberReadOutboundPortInputDto,
  ): Promise<CircleMemberReadOutboundPortOutputDto> {
    return await this.em.find(
      UsersCircles,
      {
        circle: params.circleId,
      },
      { populate: ['user'], fields: ['user'] },
    );
  }
}
