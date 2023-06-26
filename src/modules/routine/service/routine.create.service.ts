import { Inject } from '@nestjs/common';
import {
  RoutineCreateInboundPort,
  RoutineCreateInboundPortOutputDto,
  RoutineCreateInboundPortInputDto,
} from '../inbound-port/routine.create.inbound-port';
import {
  ROUTINE_CREATE_OUTBOUND_PORT,
  RoutineCreateOutboundPort,
} from '../outbound-port/routine.create.outbound-port';

export class RoutineCreateService implements RoutineCreateInboundPort {
  constructor(
    @Inject(ROUTINE_CREATE_OUTBOUND_PORT)
    private readonly routineCreateOutboundPort: RoutineCreateOutboundPort,
  ) {}

  async create(
    params: RoutineCreateInboundPortInputDto,
  ): Promise<RoutineCreateInboundPortOutputDto> {
    return this.routineCreateOutboundPort.create(params);
  }
}
