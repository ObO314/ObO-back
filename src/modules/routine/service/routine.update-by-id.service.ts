import { Inject } from '@nestjs/common';
import {
  RoutineUpdateByIdInboundPort,
  RoutineUpdateByIdInboundPortInputDto,
  RoutineUpdateByIdInboundPortOutputDto,
} from '../inbound-port/routine.update-by-id.inbound-port';
import {
  ROUTINE_UPDATE_BY_ID_OUTBOUND_PORT,
  RoutineUpdateByIdOutboundPort,
} from '../outbound-port/routine.update-by-id.outbound-port';

export class RoutineUpdateByIdService implements RoutineUpdateByIdInboundPort {
  constructor(
    @Inject(ROUTINE_UPDATE_BY_ID_OUTBOUND_PORT)
    private readonly routineUpdateByIdOutboundPort: RoutineUpdateByIdOutboundPort,
  ) {}

  updateById(
    params: RoutineUpdateByIdInboundPortInputDto,
  ): Promise<RoutineUpdateByIdInboundPortOutputDto> {
    return;
  }
}
