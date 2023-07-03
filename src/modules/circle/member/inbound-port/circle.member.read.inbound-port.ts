import { CircleApplication } from 'src/database/entities/CircleApplication';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemberReadInboundPortInputDto = {
  userId: string;
  circleId: string;
};
export type CircleMemberReadInboundPortOutputDto = Array<UsersCircles>;

export const CIRCLE_MEMBER_READ_INBOUND_PORT =
  'CIRCLE_MEMBER_READ_INBOUND_PORT' as const;

export interface CircleMemberReadInboundPort {
  execute(
    params: CircleMemberReadInboundPortInputDto,
  ): Promise<CircleMemberReadInboundPortOutputDto>;
}
