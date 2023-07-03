import { CircleApplication } from 'src/database/entities/CircleApplication';

export type CircleMemberApplyOutboundPortInputDto = {
  userId: string;
  circleId: string;
};
export type CircleMemberApplyOutboundPortOutputDto = CircleApplication;
export const CIRCLE_MEMBER_APPLY_OUTBOUND_PORT =
  'CIRCLE_MEMBER_APPLY_OUTBOUND_PORT' as const;
export interface CircleMemberApplyOutboundPort {
  execute(
    params: CircleMemberApplyOutboundPortInputDto,
  ): Promise<CircleMemberApplyOutboundPortOutputDto>;
}
