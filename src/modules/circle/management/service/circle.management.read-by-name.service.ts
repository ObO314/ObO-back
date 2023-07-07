import { Inject } from '@nestjs/common';
import {
  CIRCLE_MANAGEMENT_READ_BY_NAME_OUTBOUND_PORT,
  CircleManagementReadByNameOutboundPort,
} from '../outbound-port/circle.management.read-by-name.outbound-port';
import {
  CircleManagementReadByNameInboundPort,
  CircleManagementReadByNameInboundPortInputDto,
  CircleManagementReadByNameInboundPortOutputDto,
} from '../inbound-port/circle.management.read-by-name.inbound-port';

export class CircleManagementReadBynameService
  implements CircleManagementReadByNameInboundPort
{
  constructor(
    @Inject(CIRCLE_MANAGEMENT_READ_BY_NAME_OUTBOUND_PORT)
    private readonly circleManagementReadByNameOutboundPort: CircleManagementReadByNameOutboundPort,
  ) {}
  async execute(
    params: CircleManagementReadByNameInboundPortInputDto,
  ): Promise<CircleManagementReadByNameInboundPortOutputDto> {
    return await this.circleManagementReadByNameOutboundPort.execute(params);
  }
}
