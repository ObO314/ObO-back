import { CircleApplication } from 'src/database/entities/CircleApplication';
import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleMemeberDeleteApplicationOutboundPortInputDto = {
  circleId: string;
  userId: string;
};
export type CircleMemeberDeleteApplicationOutboundPortOutputDto =
  CircleApplication;

export const CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT =
  'CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT' as const;

export interface CircleMemeberDeleteApplicationOutboundPort {
  execute(
    params: CircleMemeberDeleteApplicationOutboundPortInputDto,
  ): Promise<CircleMemeberDeleteApplicationOutboundPortOutputDto>;
}
