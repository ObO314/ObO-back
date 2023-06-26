import { EntityManager } from '@mikro-orm/knex';
import {
  RoutineUpdateByIdOutboundPort,
  RoutineUpdateByIdOutboundPortInputDto,
  RoutineUpdateByIdOutboundPortOutputDto,
} from '../outbound-port/routine.update-by-id.outbound-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutineUpdateByIdRepository
  implements RoutineUpdateByIdOutboundPort
{
  constructor(private readonly em: EntityManager) {}

  async updateById(
    params: RoutineUpdateByIdOutboundPortInputDto,
  ): Promise<RoutineUpdateByIdOutboundPortOutputDto> {
    return;
  }
}
