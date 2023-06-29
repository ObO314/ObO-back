import { EntityManager } from '@mikro-orm/knex';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';
import {
  RoutineUpdateOutboundPort,
  RoutineUpdateOutboundPortInputDto,
  RoutineUpdateOutboundPortOutputDto,
} from '../outbound-port/routine.update.outbound-port';
import { Routines } from 'src/database/entities/Routines';

@Injectable()
export class RoutineUpdateRepository implements RoutineUpdateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineUpdateOutboundPortInputDto,
  ): Promise<RoutineUpdateOutboundPortOutputDto> {
    return await this.em.upsert(Routines, {
      id: params.routineId,
      user: params.userId,
      name: params.name,
      description: params.description,
    });
  }
}
