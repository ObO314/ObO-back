import { pipe } from '@fxts/core';
import {
  CircleManagementCreateInboundPort,
  CircleManagementCreateInboundPortInputDto,
  CircleManagementCreateInboundPortOutputDto,
} from '../inbound-port/circle.management.create.inbound-port';
import {
  CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT,
  CircleManagementCreateOutboundPort,
} from '../outbound-port/circle.management.create.outbound-port';
import { generateDate } from 'src/utilities/generateDate';
import { Inject } from '@nestjs/common';

export class CircleManagementCreateService
  implements CircleManagementCreateInboundPort
{
  constructor(
    @Inject(CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT)
    private readonly circleManagementCreateOutboundPort: CircleManagementCreateOutboundPort,
  ) {}
  async execute(
    params: CircleManagementCreateInboundPortInputDto,
  ): Promise<CircleManagementCreateInboundPortOutputDto> {
    return this.circleManagementCreateOutboundPort.execute({
      ...params,
      creationDate: generateDate(),
    });
  }
}
