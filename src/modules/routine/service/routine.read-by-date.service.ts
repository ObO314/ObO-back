import { Inject } from '@nestjs/common';
import {
  RoutineReadByDateInboundPort,
  RoutineReadByDateInboundPortInputDto,
  RoutineReadByDateInboundPortOutputDto,
} from '../inbound-port/routine.read-by-date.inbound-port';
import {
  ROUTINE_READ_BY_DATE_OUTBOUND_PORT,
  RoutineReadByDateOutboundPort,
} from '../outbound-port/routine.read-by-date.outbound-port';

export class RoutineReadByDateService implements RoutineReadByDateInboundPort {
  constructor(
    @Inject(ROUTINE_READ_BY_DATE_OUTBOUND_PORT)
    private readonly routineReadByDateOutboundPort: RoutineReadByDateOutboundPort,
  ) {}
  readByDate(
    params: RoutineReadByDateInboundPortInputDto,
  ): Promise<RoutineReadByDateInboundPortOutputDto> {
    return this.routineReadByDateOutboundPort.readByDate(params);
  }
}
