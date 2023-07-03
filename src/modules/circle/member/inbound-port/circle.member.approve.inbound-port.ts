import { CircleApplication } from 'src/database/entities/CircleApplication';

export type CircleMemberApproveInboundPortInputDto = {
  userId: string;
  circleId: string;
  applier: string;
};
export type CircleMemberApproveInboundPortOutputDto = CircleApplication;

export const CIRCLE_MEMBER_APPROVE_INBOUND_PORT =
  'CIRCLE_MEMBER_APPROVE_INBOUND_PORT' as const;
export interface CircleMemberApproveInboundPort {
  execute(
    params: CircleMemberApproveInboundPortInputDto,
  ): Promise<CircleMemberApproveInboundPortOutputDto>;
}
