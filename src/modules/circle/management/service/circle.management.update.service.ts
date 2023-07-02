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
import {
  CircleManagementUpdateInboundPort,
  CircleManagementUpdateInboundPortInputDto,
} from '../inbound-port/circle.management.update.inbound-port';
import { Circles } from 'src/database/entities/Circles';
import {
  CIRCLE_MANAGEMENT_UPDATE_OUTBOUND_PORT,
  CircleManagementUpdateOutboundPort,
} from '../outbound-port/circle.management.update.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class CircleManagementReadService
  implements CircleManagementUpdateInboundPort
{
  constructor(
    @Inject(CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT)
    private readonly circleManagementReadOutboundPort: CircleManagementReadOutboundPort,
    @Inject(CIRCLE_MANAGEMENT_UPDATE_OUTBOUND_PORT)
    private readonly circleManagementUpdateOutboundPort: CircleManagementUpdateOutboundPort,
  ) {}

  async execute(
    params: CircleManagementUpdateInboundPortInputDto,
  ): Promise<Circles> {
    const foundCircle = await this.circleManagementReadOutboundPort.execute({
      circleId: params.circleId,
    });

    const toUpdateCircle = { params, foundCircle };

    return await pipe(
      [toUpdateCircle],
      toAsync,
      filter(
        async ({ params, foundCircle }) =>
          params.userId == foundCircle.owner.id,
      ),
      map(({ params, foundCircle }) =>
        this.circleManagementUpdateOutboundPort.execute({
          ...foundCircle,
          ...params,
        }),
      ),
      head,
    );
  }
}
