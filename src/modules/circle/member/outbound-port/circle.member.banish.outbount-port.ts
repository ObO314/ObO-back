import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemeberBanishOutboundPortInputDto = {
  circleId: string;
  userId: string;
};
export type CircleMemeberBanishOutboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_BANISH_OUTBOUND_PORT =
  'CIRCLE_MEMBER_BANISH_OUTBOUND_PORT' as const;

export interface CircleMemeberBanishOutboundPort {
  execute(
    params: CircleMemeberBanishOutboundPortInputDto,
  ): Promise<CircleMemeberBanishOutboundPortOutputDto>;
}
