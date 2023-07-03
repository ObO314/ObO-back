import { Circles } from 'src/database/entities/Circles';

export type CircleMemberReadCircleOutboundPortInputDto = {
  circleId: string;
};
export type CircleMemberReadCircleOutboundPortOutputDto = Circles;

export const CIRCLE_MEMBER_READ_CIRCLE_OUTBOUND_PORT =
  'CIRCLE_MEMBER_READ_CIRCLE_OUTBOUND_PORT' as const;
export interface CircleMemberReadCircleOutboundPort {
  execute(
    params: CircleMemberReadCircleOutboundPortInputDto,
  ): Promise<CircleMemberReadCircleOutboundPortOutputDto>;
}
