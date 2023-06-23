import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineCreateOutboundPort,
  RoutineCreateOutboundPortInputDto,
  RoutineCreateOutboundPortOutputDto,
} from '../outbound-port/routine.create.outbound-port';
import { Injectable } from '@nestjs/common';
import { Routines } from 'src/database/entities/Routines';
import { filter, pipe, tap } from '@fxts/core';

@Injectable()
export class RoutineCreateRepository implements RoutineCreateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  validateTimeString(time: string) {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(time);
  }

  async create(
    params: RoutineCreateOutboundPortInputDto,
  ): Promise<RoutineCreateOutboundPortOutputDto> {
    // 시간 string 값 검증로직 필요한 지?
    const em = this.em;

    return await pipe(
      [params],
      filter((params) => this.validateTimeString(params.startTime)),
      filter((params) => this.validateTimeString(params.endTime)),
      (params) => em.create(Routines, params),
      tap((routine) => {
        em.persistAndFlush(routine);
      }),
    );
  }
}
