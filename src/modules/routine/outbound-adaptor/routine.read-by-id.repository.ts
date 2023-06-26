import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineReadByIdOutboundPort,
  RoutineReadByIdOutboundPortInputDto,
  RoutineReadByIdOutboundPortOutputDto,
} from '../outbound-port/routine.read-by-id.outbound-port';
import { Routines } from 'src/database/entities/Routines';

export class RoutineReadByIdRepository implements RoutineReadByIdOutboundPort {
  constructor(private readonly em: EntityManager) {}
  async readById(
    params: RoutineReadByIdOutboundPortInputDto,
  ): Promise<RoutineReadByIdOutboundPortOutputDto> {
    return await this.em.findOne(Routines, { id: params.routineId });
  }
}
