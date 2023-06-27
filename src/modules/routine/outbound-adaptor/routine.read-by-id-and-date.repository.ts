import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineReadByIdAndDateOutboundPortInputDto,
  RoutineReadByIdAndDateOutboundPortOutputDto,
  RoutineReadByIdAndDateOutboundPort,
} from '../outbound-port/routine.read-by-id-and-date.outbound-port';
import { RoutineReadByUserAndDateOutboundPortOutputDto } from '../outbound-port/routine.read-by-user-and-date.outbound-port';
import { Injectable } from '@nestjs/common';
import { RoutineRecords } from 'src/database/entities/RoutineRecords';

@Injectable()
export class RoutineReadByIdAndDateRepository
  implements RoutineReadByIdAndDateOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: RoutineReadByIdAndDateOutboundPortInputDto,
  ): Promise<RoutineReadByIdAndDateOutboundPortOutputDto> {
    const em = this.em;

    return !!(await em.findOne(RoutineRecords, {
      routine: params.routineId,
      date: params.date,
    }));
  }
}
