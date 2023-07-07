import { CircleApplication } from 'src/database/entities/CircleApplication';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberBanishInboundPortInputDto = {
  userId: string;
  circleId: string;
  memberId: string;
};
export type CircleMemberBansishInboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_BANISH_INBOUND_PORT =
  'CIRCLE_MEMBER_BANISH_INBOUND_PORT' as const;

export interface CircleMemberBanishInboundPort {
  execute(
    params: CircleMemberBanishInboundPortInputDto,
  ): Promise<CircleMemberBansishInboundPortOutputDto>;
}
