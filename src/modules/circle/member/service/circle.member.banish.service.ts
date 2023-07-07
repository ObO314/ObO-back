import { CircleMemberBanishInboundPort } from './../inbound-port/circle.member.banish.inbound-port';
import {
  CircleMemberBanishInboundPortInputDto,
  CircleMemberBansishInboundPortOutputDto,
} from '../inbound-port/circle.member.banish.inbound-port';
import { filter, head, map, pipe, tap, toAsync } from '@fxts/core';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemberFindOutboundPort,
} from '../outbound-port/circle.member.find.outbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  CIRCLE_MEMBER_BANISH_OUTBOUND_PORT,
  CircleMemeberBanishOutboundPort,
} from '../outbound-port/circle.member.banish.outbount-port';
import {
  CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT,
  CircleMemberUpdateCircleOutboundPort,
} from '../outbound-port/circle.member.update-circle.outbound-port';

export class CircleMemberBanishService
  implements CircleMemberBanishInboundPort
{
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_BANISH_OUTBOUND_PORT)
    private readonly circleMemeberBanishOutboundPort: CircleMemeberBanishOutboundPort,
    @Inject(CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT)
    private readonly circleMemberUpdateCircleOutboundPort: CircleMemberUpdateCircleOutboundPort,
  ) {}

  async execute(
    params: CircleMemberBanishInboundPortInputDto,
  ): Promise<CircleMemberBansishInboundPortOutputDto> {
    // 권한확인
    // 추방
    // 전체인원수 -1

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
      map((params) => {
        this.circleMemberUpdateCircleOutboundPort.execute({
          circleId: params.circleId,
          members: -1,
        });
        return params;
      }),
      map((params) =>
        this.circleMemeberBanishOutboundPort.execute({
          userId: params.memberId,
          circleId: params.circleId,
        }),
      ),
      head,
    );
  }
}
