import { Inject } from '@nestjs/common';
import {
  RoutineReadByIdInboundPort,
  RoutineReadByIdInboundPortInputDto,
  RoutineReadByIdInboundPortOutputDto,
} from '../inbound-port/routine.read-by-id.inbound-port';
import { RoutineReadByIdOutboundPort } from '../outbound-port/routine.read-by-id.outbound-port';

export class RoutineReadByIdService implements RoutineReadByIdInboundPort {
  constructor(
    @Inject()
    private readonly routineReadByIdOutboundPort: RoutineReadByIdOutboundPort,
  ) {}

  async readById(
    params: RoutineReadByIdInboundPortInputDto,
  ): Promise<RoutineReadByIdInboundPortOutputDto> {
    return await this.routineReadByIdOutboundPort.readById(params);
  }
}
