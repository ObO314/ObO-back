import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemeberUpdateCircleOutboundPortInputDto = {
  circleId: string;
  member: number;
};
export type CircleMemeberUpdateCircleOutboundPortOutputDto = Circles;

export const CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT =
  'CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT' as const;

export interface CircleMemeberUpdateCircleOutboundPort {
  execute(
    params: CircleMemeberUpdateCircleOutboundPortInputDto,
  ): Promise<CircleMemeberUpdateCircleOutboundPortOutputDto>;
}
