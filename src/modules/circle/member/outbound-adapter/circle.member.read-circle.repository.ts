import { EntityManager } from '@mikro-orm/knex';
import {
  CircleMemberReadCircleOutboundPort,
  CircleMemberReadCircleOutboundPortInputDto,
  CircleMemberReadCircleOutboundPortOutputDto,
} from '../outbound-port/circle.member.read-circle.outbound-port';
import { Circles } from 'src/database/entities/Circles';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleMemberReadCircleRepository
  implements CircleMemberReadCircleOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberReadCircleOutboundPortInputDto,
  ): Promise<CircleMemberReadCircleOutboundPortOutputDto> {
    return await this.em.findOne(Circles, {
      id: params.circleId,
    });
  }
}
