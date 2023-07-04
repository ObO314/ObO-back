import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberUpdateOutboundPortInputDto = {
  circleId: string;
  memberId: string;
  grade: string;
};
export type CircleMemberUpdateOutboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_UPDATE_OUTBOUND_PORT =
  'CIRCLE_MEMBER_UPDATE_OUTBOUND_PORT' as const;

export interface CircleMemberUpdateOutboundPort {
  execute(
    params: CircleMemberUpdateOutboundPortInputDto,
  ): Promise<CircleMemberUpdateOutboundPortOutputDto>;
}
