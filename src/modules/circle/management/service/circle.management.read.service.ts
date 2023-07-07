import { Inject } from '@nestjs/common';
import {
  CircleManagementReadInboundPort,
  CircleManagementReadInboundPortInputDto,
  CircleManagementReadInboundPortOutputDto,
} from '../inbound-port/circle.management.read.inbound-port';
import {
  CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT,
  CircleManagementReadOutboundPort,
} from '../outbound-port/circle.management.read.outbound-port';

export class CircleManagementReadService
  implements CircleManagementReadInboundPort
{
  constructor(
    @Inject(CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT)
    private readonly circleManagementReadOutboundPort: CircleManagementReadOutboundPort,
  ) {}

  execute(
    params: CircleManagementReadInboundPortInputDto,
  ): Promise<CircleManagementReadInboundPortOutputDto> {
    return this.circleManagementReadOutboundPort.execute(params);
  }
}
