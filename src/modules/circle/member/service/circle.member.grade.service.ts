import { UsersCircles } from 'src/database/entities/UsersCircles';
import {
  CircleMemberGradeInboundPort,
  CircleMemberGradeInboundPortInputDto,
  CircleMemberGradeInboundPortOutputDto,
} from '../inbound-port/circle.member.grade.inbound-port';
import {
  CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
  CircleMemberFindOutboundPort,
} from '../outbound-port/circle.member.find.outbound-port';
import { filter, head, map, pipe, toAsync } from '@fxts/core';
import {
  CIRCLE_MEMBER_UPDATE_OUTBOUND_PORT,
  CircleMemberUpdateOutboundPort,
} from '../outbound-port/circle.member.update.outbound-port';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

export class CircleMemberGradeService implements CircleMemberGradeInboundPort {
  constructor(
    @Inject(CIRCLE_MEMBER_FIND_OUTBOUND_PORT)
    private readonly circleMemberFindOutboundPort: CircleMemberFindOutboundPort,
    @Inject(CIRCLE_MEMBER_UPDATE_OUTBOUND_PORT)
    private readonly circleMemberUpdateCircleOutboundPort: CircleMemberUpdateOutboundPort,
  ) {}

  async execute(
    params: CircleMemberGradeInboundPortInputDto,
  ): Promise<CircleMemberGradeInboundPortOutputDto> {
    // 권한을 확인하고

    // 등급을 수정한다
    return await pipe(
      [params],
      toAsync,
      filter(async (params) => {
        const userGrade = Number(
          (
            await this.circleMemberFindOutboundPort.execute({
              userId: params.userId,
              circleId: params.circleId,
            })
          ).grade.id,
        );
        if (userGrade >= 3) {
          throw new HttpException('권한이 없습니다.', HttpStatus.BAD_REQUEST);
        } else {
          return true;
        }
      }),
      map((params) =>
        this.circleMemberUpdateCircleOutboundPort.execute(params),
      ),
      head,
    );
  }
}
