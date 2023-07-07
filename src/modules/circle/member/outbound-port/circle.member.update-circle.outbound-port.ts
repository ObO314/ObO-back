import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberUpdateCircleOutboundPortInputDto = {
  circleId: string;
  members: number;
};
export type CircleMemberUpdateCircleOutboundPortOutputDto = Circles;

export const CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT =
  'CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT' as const;

export interface CircleMemberUpdateCircleOutboundPort {
  execute(
    params: CircleMemberUpdateCircleOutboundPortInputDto,
  ): Promise<CircleMemberUpdateCircleOutboundPortOutputDto>;
}
