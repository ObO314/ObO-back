import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberGradeInboundPortInputDto = {
  userId: string;
  circleId: string;
  memberId: string;
  grade: string;
};
export type CircleMemberGradeInboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_GRADE_INBOUND_PORT =
  'CIRCLE_MEMBER_GRADE_INBOUND_PORT' as const;

export interface CircleMemberGradeInboundPort {
  execute(
    params: CircleMemberGradeInboundPortInputDto,
  ): Promise<CircleMemberGradeInboundPortOutputDto>;
}
