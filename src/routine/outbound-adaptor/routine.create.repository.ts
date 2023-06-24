import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineCreateOutboundPort,
  RoutineCreateOutboundPortInputDto,
  RoutineCreateOutboundPortOutputDto,
} from '../outbound-port/routine.create.outbound-port';
import {
  BadRequestException,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { Routines } from 'src/database/entities/Routines';
import { filter, pipe, tap } from '@fxts/core';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';

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

    if (
      !this.validateTimeString(params.startTime) ||
      !this.validateTimeString(params.endTime)
    ) {
      throw new HttpException(
        '시간 값이 잘못 입력되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const routineData = {
      user: params.userId,
      name: params.name,
      description: params.description,
    };
    const createdRoutine = em.create(Routines, routineData);
    await em.persistAndFlush(createdRoutine);

    const routineHistoryData = {
      routine: createdRoutine.id,
      updatedTime: new Date(),
      startTime: params.startTime,
      endTime: params.endTime,
    };
    const createdRoutineHistory = em.create(
      RoutineHistories,
      routineHistoryData,
    );
    await em.persistAndFlush(createdRoutineHistory);

    return createdRoutine;
  }
}
