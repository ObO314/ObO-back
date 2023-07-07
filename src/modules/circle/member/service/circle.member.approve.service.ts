import { CircleApplication } from 'src/database/entities/CircleApplication';
import {
  CircleMemberApproveInboundPort,
  CircleMemberApproveInboundPortInputDto,
  CircleMemberApproveInboundPortOutputDto,
} from '../inbound-port/circle.member.approve.inbound-port';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemberFindOutboundPort,
} from '../outbound-port/circle.member.find.outbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  CIRCLE_MEMBER_CREATE_OUTBOUND_PORT,
  CircleMemberCreateOutboundPort,
} from '../outbound-port/circle.member.create.outbound-port';
import {
  CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT,
  CircleMemberDeleteApplicationOutboundPort,
} from '../outbound-port/circle.member.delete-application.outbound-port';
import {
  CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT,
  CircleMemberUpdateCircleOutboundPort,
} from '../outbound-port/circle.member.update-circle.outbound-port';

import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class CircleMemberApproveService
  implements CircleMemberApproveInboundPort
{
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_CREATE_OUTBOUND_PORT)
    private readonly circleMemberCreateOutboundPort: CircleMemberCreateOutboundPort,
    @Inject(CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT)
    private readonly circleMemberDeleteApplicationOutboundPort: CircleMemberDeleteApplicationOutboundPort,
    @Inject(CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT)
    private readonly circleMemberUpdateCircleOutboundPort: CircleMemberUpdateCircleOutboundPort,
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
        if (
          Number(
            (
              await this.circleMemberFindOutboundPort.execute({
                userId: params.userId,
                circleId: params.circleId,
              })
            ).grade.id,
          ) <= 2
        ) {
          return true;
        } else {
          throw new HttpException('권한이 없습니다.', HttpStatus.BAD_REQUEST);
        }
      }),
      map(
        async (params) =>
          await this.circleMemberCreateOutboundPort.execute({
            circleId: params.circleId,
            userId: params.applier,
          }),
      ),
      map(async (params) => {
        this.circleMemberUpdateCircleOutboundPort.execute({
          circleId: params.circle.id,
          members: 1,
        });
        return params;
      }),
      map(async (params) =>
        this.circleMemberDeleteApplicationOutboundPort.execute({
          circleId: params.circle.id,
          userId: params.user.id,
        }),
      ),
      head,
    );
  }
}
