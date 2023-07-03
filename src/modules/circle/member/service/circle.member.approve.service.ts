import { CircleApplication } from 'src/database/entities/CircleApplication';
import {
  CircleMemberApproveInboundPort,
  CircleMemberApproveInboundPortInputDto,
  CircleMemberApproveInboundPortOutputDto,
} from '../inbound-port/circle.member.approve.inbound-port';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemeberFindOutboundPort,
} from '../outbound-port/circle.member.find.outbound-port';
import { Inject } from '@nestjs/common';
import {
  CIRCLE_MEMBER_CREATE_OUTBOUND_PORT,
  CircleMemberCreateOutboundPort,
} from '../outbound-port/circle.member.create.outbound-port';
import {
  CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT,
  CircleMemeberDeleteApplicationOutboundPort,
} from '../outbound-port/circle.member.delete-application.outbound-port';
import {
  CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT,
  CircleMemeberUpdateCircleOutboundPort,
} from '../outbound-port/circle.member.update-circle.outbound-port';

import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class CircleMemberApproveService
  implements CircleMemberApproveInboundPort
{
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemeberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_CREATE_OUTBOUND_PORT)
    private readonly circleMemberCreateOutboundPort: CircleMemberCreateOutboundPort,
    @Inject(CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT)
    private readonly circleMemeberDeleteApplicationOutboundPort: CircleMemeberDeleteApplicationOutboundPort,
    @Inject(CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT)
    private readonly circleMemeberUpdateCircleOutboundPort: CircleMemeberUpdateCircleOutboundPort,
  ) {}

  async execute(
    params: CircleMemberApproveInboundPortInputDto,
  ): Promise<CircleMemberApproveInboundPortOutputDto> {
    // 승인하려는 자가 권한을 가진 사람인가
    // 승인 시, UserCircle에 추가되고
    // 서클의 전체 인원수는 증가되어야 함
    // applications에서는 지원 내용이 삭제되어야 함
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        console.log(params);
        return (
          Number(
            (
              await this.circleMemberFindOutboundPort.execute({
                userId: params.userId,
                circleId: params.circleId,
              })
            ).role.id,
          ) <= 2
        );
      }),
      map(
        async (params) =>
          await this.circleMemberCreateOutboundPort.execute({
            circleId: params.circleId,
            userId: params.applier,
          }),
      ),
      map(async (params) => {
        this.circleMemeberUpdateCircleOutboundPort.execute({
          circleId: (await params).circle.id,
          member: 1,
        });
        return params;
      }),
      map(async (params) =>
        this.circleMemeberDeleteApplicationOutboundPort.execute({
          circleId: (await params).circle.id,
          userId: (await params).user.id,
        }),
      ),
      head,
    );
  }
}
