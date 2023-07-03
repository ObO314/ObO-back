import { EntityManager } from '@mikro-orm/knex';
import {
  CircleManagementCreateMemberOutboundPort,
  CircleManagementCreateMemberOutboundPortInputDto,
  CircleManagementCreateMemberOutboundPortOutputDto,
} from '../outbound-port/circle.management.create-member.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CircleManagementCreateMemberRepository
  implements CircleManagementCreateMemberOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: CircleManagementCreateMemberOutboundPortInputDto,
  ): Promise<CircleManagementCreateMemberOutboundPortOutputDto> {
    const newMember = await this.em.create(UsersCircles, {
      user: params.userId,
      circle: params.circleId,
      role: params.role,
    });
    await this.em.persistAndFlush(newMember);
    return newMember;
  }
}
