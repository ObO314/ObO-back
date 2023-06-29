import { EntityManager } from '@mikro-orm/knex';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Routines } from 'src/database/entities/Routines';
import {
  RoutineCreateHistoryOutboundPort,
  RoutineCreateHistoryOutboundPortInputDto,
  RoutineCreateHistoryOutboundPortOutputDto,
} from '../outbound-port/routine.create-history.outbound-port';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';

@Injectable()
export class RoutineCreateHistoryRepository
  implements RoutineCreateHistoryOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  validateTimeString(time: string): boolean {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(time);
  }

  async execute(
    params: RoutineCreateHistoryOutboundPortInputDto,
  ): Promise<RoutineCreateHistoryOutboundPortOutputDto> {
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
    const result = await em.upsert(RoutineHistories, params);
    await em.flush();
    return result;
  }
}
