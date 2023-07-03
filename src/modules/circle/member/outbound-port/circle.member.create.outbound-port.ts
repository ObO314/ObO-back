import { CircleApplication } from 'src/database/entities/CircleApplication';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberCreateOutboundPortInputDto = {
  userId: string;
  circleId: string;
};
export type CircleMemberCreateOutboundPortOutputDto = UsersCircles;

export const CIRCLE_MEMBER_CREATE_OUTBOUND_PORT =
  'CIRCLE_MEMBER_CREATE_OUTBOUND_PORT' as const;

export interface CircleMemberCreateOutboundPort {
  execute(
    params: CircleMemberCreateOutboundPortInputDto,
  ): Promise<CircleMemberCreateOutboundPortOutputDto>;
}
