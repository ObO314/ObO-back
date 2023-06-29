import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineCreateOutboundPort,
  RoutineCreateOutboundPortInputDto,
  RoutineCreateOutboundPortOutputDto,
} from '../outbound-port/routine.create.outbound-port';
import { Injectable } from '@nestjs/common';
import { Routines } from 'src/database/entities/Routines';

@Injectable()
export class RoutineCreateRepository implements RoutineCreateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineCreateOutboundPortInputDto,
  ): Promise<RoutineCreateOutboundPortOutputDto> {
    const em = this.em;
    const createdRoutine = em.create(Routines, params);
    await em.persistAndFlush(createdRoutine);
    return createdRoutine;
  }
}
