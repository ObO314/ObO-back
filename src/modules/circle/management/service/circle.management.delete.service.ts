import { Inject } from '@nestjs/common';
import {
  CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT,
  CircleManagementDeleteInboundPort,
  CircleManagementDeleteInboundPortInputDto,
  CircleManagementDeleteInboundPortOutputDto,
} from '../inbound-port/circle.management.delete.inbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT,
  CircleManagementDeleteOutboundPort,
} from '../outbound-port/circle.management.delete.outbound-port';
import {
  CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT,
  CircleManagementReadOutboundPort,
} from '../outbound-port/circle.management.read.outbound-port';

export class CircleManagementDeleteService
  implements CircleManagementDeleteInboundPort
{
  constructor(
    @Inject(CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT)
    private readonly circleManagementReadOutboundPort: CircleManagementReadOutboundPort,
    @Inject(CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT)
    private readonly circleManagementDeleteOutboundPort: CircleManagementDeleteOutboundPort,
  ) {}
  async execute(
    params: CircleManagementDeleteInboundPortInputDto,
  ): Promise<CircleManagementDeleteInboundPortOutputDto> {
    // 삭제하는 사람이 그 서클의 주인인가?
    // 서클에 남은 인원이 본인혼자 인가?
    return await pipe(
      [params],
      toAsync,
      map(async (params) => {
        return {
          ...params,
          circle: await this.circleManagementReadOutboundPort.execute({
            circleId: params.circle,
          }),
        };
      }),
      filter((params) => params.circle.members == '1'),
      filter((params) => params.user == params.circle.owner.id),
      map((params) =>
        this.circleManagementDeleteOutboundPort.execute({
          circleId: params.circle.id,
        }),
      ),
      head,
    );
  }
}
