import { CircleApplication } from 'src/database/entities/CircleApplication';

export type CircleMemberApplyInboundPortInputDto = {
  userId: string;
  circleId: string;
};
export type CircleMemberApplyInboundPortOutputDto = CircleApplication;

export const CIRCLE_MEMBER_APPLY_INBOUND_PORT =
  'CIRCLE_MEMBER_APPLY_INBOUND_PORT' as const;

export interface CircleMemberApplyInboundPort {
  execute(
    params: CircleMemberApplyInboundPortInputDto,
  ): Promise<CircleMemberApplyInboundPortOutputDto>;
}
