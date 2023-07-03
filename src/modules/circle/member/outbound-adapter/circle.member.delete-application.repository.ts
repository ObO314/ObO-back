import { EntityManager } from '@mikro-orm/knex';
import {
  CircleMemeberDeleteApplicationOutboundPort,
  CircleMemeberDeleteApplicationOutboundPortInputDto,
  CircleMemeberDeleteApplicationOutboundPortOutputDto,
} from '../outbound-port/circle.member.delete-application.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';
import { CircleApplication } from 'src/database/entities/CircleApplication';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleMemberDeleteApplicationRespository
  implements CircleMemeberDeleteApplicationOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemeberDeleteApplicationOutboundPortInputDto,
  ): Promise<CircleMemeberDeleteApplicationOutboundPortOutputDto> {
    const toDeleteApplication = await this.em.findOne(CircleApplication, {
      user: params.userId,
      circle: params.circleId,
    });
    await this.em.removeAndFlush(toDeleteApplication);
    return toDeleteApplication;
  }
}
