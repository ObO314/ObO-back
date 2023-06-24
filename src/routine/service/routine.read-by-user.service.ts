import { Inject } from '@nestjs/common';
import {
  RoutineReadByUserInboundPort,
  RoutineReadByUserInboundPortInputDto,
  RoutineReadByUserInboundPortOutputDto,
} from '../inbound-port/routine.read-by-user.inbound-port';
import {
  ROUTINE_READ_BY_USER_OUTBOUND_PORT,
  RoutineReadByUserOutboundPort,
} from '../outbound-port/routine.read-by-user.outbound-port';

export class RoutineReadByUserService implements RoutineReadByUserInboundPort {
  constructor(
    @Inject(ROUTINE_READ_BY_USER_OUTBOUND_PORT)
    private readonly routineReadByUserOutboundPort: RoutineReadByUserOutboundPort,
  ) {}
  readByUser(
    params: RoutineReadByUserInboundPortInputDto,
  ): Promise<RoutineReadByUserInboundPortOutputDto> {
    return this.routineReadByUserOutboundPort.readByUser(params);
  }
}
