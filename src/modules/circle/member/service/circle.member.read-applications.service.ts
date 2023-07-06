import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  CircleMemberReadApplicationsInboundPort,
  CircleMemberReadApplicationsInboundPortInputDto,
  CircleMemberReadApplicationsInboundPortOutputDto,
} from '../inbound-port/circle.member.read-applications.inbound-port';

import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  CIRCLE_MEMBER_READ_APPLICATIONS_OUTBOUND_PORT,
  CircleMemberReadApplicationsOutboundPort,
} from '../outbound-port/circle.member.read-applications.outbound-port';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemberFindOutboundPort,
} from '../outbound-port/circle.member.find.outbound-port';

export class CircleMemberReadApplicationsService
  implements CircleMemberReadApplicationsInboundPort
{
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_READ_APPLICATIONS_OUTBOUND_PORT)
    private readonly circleMemberReadApplicationsOutboundPort: CircleMemberReadApplicationsOutboundPort,
  ) {}

  async execute(
    params: CircleMemberReadApplicationsInboundPortInputDto,
  ): Promise<CircleMemberReadApplicationsInboundPortOutputDto> {
    // 요청 유저의 등급이 스태프 이상인지 확인하고
    // userId로
    // 그 이상이면 리스트를 불러와 보여줌

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
      map((params) =>
        this.circleMemberReadApplicationsOutboundPort.execute(params),
      ),
      head,
    );
  }
}
