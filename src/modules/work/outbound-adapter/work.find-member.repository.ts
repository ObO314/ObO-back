import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Works } from 'src/database/entities/Works';
import {
  WorkFindMemberOutboundPort,
  WorkFindMemberOutboundPortInputDto,
  WorkFindMemberOutboundPortOutputDto,
} from '../outbound-port/work.find-member.outbound-port';
import { UsersCircles } from 'src/database/entities/UsersCircles';

@Injectable()
export class WorkFindMemberRepository implements WorkFindMemberOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: WorkFindMemberOutboundPortInputDto,
  ): Promise<WorkFindMemberOutboundPortOutputDto> {
    return this.em.findOne(UsersCircles, {
      circle: params.circleId,
      user: params.userId,
    });
  }
}
