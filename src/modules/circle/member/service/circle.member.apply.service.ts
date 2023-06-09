import { CircleManagementReadOutboundPort } from './../../management/outbound-port/circle.management.read.outbound-port';
import {
  CircleMemberApplyInboundPort,
  CircleMemberApplyInboundPortInputDto,
  CircleMemberApplyInboundPortOutputDto,
} from '../inbound-port/circle.member.apply.inbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  CIRCLE_MEMBER_READ_CIRCLE_OUTBOUND_PORT,
  CircleMemberReadCircleOutboundPort,
  CircleMemberReadCircleOutboundPortInputDto,
} from '../outbound-port/circle.member.read-circle.outbound-port';
import {
  CIRCLE_MEMBER_APPLY_OUTBOUND_PORT,
  CircleMemberApplyOutboundPort,
  CircleMemberApplyOutboundPortInputDto,
} from '../outbound-port/circle.member.apply.outbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemberFindOutboundPort,
  CircleMemberFindOutboundPortInputDto,
} from '../outbound-port/circle.member.find.outbound-port';

export class CircleMemberApplyService implements CircleMemberApplyInboundPort {
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_READ_CIRCLE_OUTBOUND_PORT)
    private readonly circleMemberReadCircleOutboundPort: CircleMemberReadCircleOutboundPort,
    @Inject(CIRCLE_MEMBER_APPLY_OUTBOUND_PORT)
    private readonly circleMemberApplyOutboundPort: CircleMemberApplyOutboundPort,
  ) {}

  async execute(
    params: CircleMemberApplyInboundPortInputDto,
  ): Promise<CircleMemberApplyInboundPortOutputDto> {
    // 이미 가입한 서클인지 확인
    // 가입 가능상태인지 확인
    // 서클 가입 신청

    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        if (await this.circleMemberFindOutboundPort.execute(params)) {
          return true;
        } else {
          throw new HttpException(
            '이미 가입한 서클입니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      filter(async (params) => {
        if (
          (
            await this.circleMemberReadCircleOutboundPort.execute({
              circleId: params.circleId,
            })
          ).isOpen
        ) {
          return true;
        } else {
          throw new HttpException(
            '이 서클은 현재 모집 중이 아닙니다.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }),
      map((params) => this.circleMemberApplyOutboundPort.execute(params)),
      head,
    );
  }
}
