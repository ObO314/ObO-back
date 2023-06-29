import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import {
  RoutineReadOutboundPort,
  RoutineReadOutboundPortInputDto,
  RoutineReadOutboundPortOutputDto,
} from '../outbound-port/routine.read.outbound-port';
import { Routines } from 'src/database/entities/Routines';

@Injectable()
export class RoutineReadRepository implements RoutineReadOutboundPort {
  constructor(private readonly em: EntityManager) {}
  async execute(
    params: RoutineReadOutboundPortInputDto,
  ): Promise<RoutineReadOutboundPortOutputDto> {
    return await this.em.findOne(Routines, {
      id: params.routineId,
      user: params.userId,
    });
  }
}
