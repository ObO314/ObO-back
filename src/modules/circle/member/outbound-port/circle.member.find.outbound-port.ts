import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberFindOutboundPortInputDto = {
  circleId: string;
  userId: string;
};
export type CircleMemberFindOutboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_FIND_OUTBOUND_PORT =
  'CIRCLE_MEMBER_FIND_OUTBOUND_PORT' as const;

export interface CircleMemberFindOutboundPort {
  execute(
    params: CircleMemberFindOutboundPortInputDto,
  ): Promise<CircleMemberFindOutboundPortOutputDto>;
}
