import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberReadOutboundPortInputDto = {
  circleId: string;
};
export type CircleMemberReadOutboundPortOutputDto = Array<UsersCircles>;

export const CIRCLE_MEMBER_READ_OUTBOUND_PORT =
  'CIRCLE_MEMBER_READ_OUTBOUND_PORT' as const;
export interface CircleMemberReadOutboundPort {
  execute(
    params: CircleMemberReadOutboundPortInputDto,
  ): Promise<CircleMemberReadOutboundPortOutputDto>;
}
