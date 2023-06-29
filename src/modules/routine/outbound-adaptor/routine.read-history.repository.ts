import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import {
  RoutineReadHistoryOutboundPort,
  RoutineReadHistoryOutboundPortInputDto,
  RoutineReadHistoryOutboundPortOutputDto,
} from '../outbound-port/routine.read-history.outbound-port';
import { RoutineHistories } from 'src/database/entities/RoutineHistories';

@Injectable()
export class RoutineReadHistoryRepository
  implements RoutineReadHistoryOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineReadHistoryOutboundPortInputDto,
  ): Promise<RoutineReadHistoryOutboundPortOutputDto> {
    return await this.em.findOne(
      RoutineHistories,
      { routine: params.routineId, updatedAt: { $lte: params.date } },
      { orderBy: [{ updatedAt: 'DESC' }] },
    );
  }
}
