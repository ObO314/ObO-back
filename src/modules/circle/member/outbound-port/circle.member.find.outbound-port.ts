import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemeberFindOutboundPortInputDto = {
  circleId: string;
  userId: string;
};
export type CircleMemeberFindOutboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_FIND_OUTBOUND_PORT =
  'CIRCLE_MEMBER_FIND_OUTBOUND_PORT' as const;

export interface CircleMemeberFindOutboundPort {
  execute(
    params: CircleMemeberFindOutboundPortInputDto,
  ): Promise<CircleMemeberFindOutboundPortOutputDto>;
}
