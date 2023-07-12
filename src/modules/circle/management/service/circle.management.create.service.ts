import {
  CIRCLE_MANAGEMENT_CREATE_MEMBER_OUTBOUND_PORT,
  CircleManagementCreateMemberOutboundPort,
} from './../outbound-port/circle.management.create-member.outbound-port';
import { head, map, pipe, tap, toAsync } from '@fxts/core';
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
    @Inject(CIRCLE_MANAGEMENT_CREATE_MEMBER_OUTBOUND_PORT)
    private readonly circleManagementCreateMemberOutboundPort: CircleManagementCreateMemberOutboundPort,
  ) {}
  async execute(
    params: CircleManagementCreateInboundPortInputDto,
  ): Promise<CircleManagementCreateInboundPortOutputDto> {
    return await pipe(
      [params],
      toAsync,
      map((params) =>
        this.circleManagementCreateOutboundPort.execute({
          ...params,
          creationDate: generateDate(),
        }),
      ),
      map((params) => {
        this.circleManagementCreateMemberOutboundPort.execute({
          userId: params.owner.id,
          circleId: params.id,
          grade: '1',
        });
        return params;
      }),
      head,
    );
  }
}
