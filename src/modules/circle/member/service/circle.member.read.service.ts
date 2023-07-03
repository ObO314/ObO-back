import { Inject } from '@nestjs/common';
import {
  CircleMemberReadInboundPort,
  CircleMemberReadInboundPortInputDto,
  CircleMemberReadInboundPortOutputDto,
} from '../inbound-port/circle.member.read.inbound-port';
import {
  CIRCLE_MEMBER_READ_OUTBOUND_PORT,
  CircleMemberReadOutboundPort,
} from '../outbound-port/circle.member.read.outbound-port';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemeberFindOutboundPort,
} from '../outbound-port/circle.member.find.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';

export class CircleMemberReadService implements CircleMemberReadInboundPort {
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemeberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_READ_OUTBOUND_PORT)
    private readonly circleMemberReadOutboundPort: CircleMemberReadOutboundPort,
  ) {}

  async execute(
    params: CircleMemberReadInboundPortInputDto,
  ): Promise<CircleMemberReadInboundPortOutputDto> {
    // 보려는 유저가 이 서클의 멤버인지 확인한 후

    // 멤버 리스트+등급 반환
    return await pipe(
      [params],
      toAsync,
      filter((params) => this.circleMemberFindOutboundPort.execute(params)),
      map((params) =>
        this.circleMemberReadOutboundPort.execute({
          circleId: params.circleId,
        }),
      ),
      head,
    );
  }
}
