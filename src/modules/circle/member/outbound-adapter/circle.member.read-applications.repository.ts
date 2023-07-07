import { EntityManager } from '@mikro-orm/knex';
import { Circles } from 'src/database/entities/Circles';
import { Injectable } from '@nestjs/common';
import {
  CircleMemberReadApplicationsOutboundPort,
  CircleMemberReadApplicationsOutboundPortInputDto,
  CircleMemberReadApplicationsOutboundPortOutputDto,
} from '../outbound-port/circle.member.read-applications.outbound-port';
import { CircleApplication } from 'src/database/entities/CircleApplication';

@Injectable()
export class CircleMemberReadApplicationsRepository
  implements CircleMemberReadApplicationsOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleMemberReadApplicationsOutboundPortInputDto,
  ): Promise<CircleMemberReadApplicationsOutboundPortOutputDto> {
    return await this.em.find(
      CircleApplication,
      {
        circle: params.circleId,
      },
      { populate: ['user'] },
    );
  }
}
