import { Circles } from 'src/database/entities/Circles';

export type CircleManagementReadInboundPortInputDto = {
  circleId: string;
};
export type CircleManagementReadInboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_READ_INBOUND_PORT =
  'CIRCLE_MANAGEMENT_READ_INBOUND_PORT' as const;

export interface CircleManagementReadInboundPort {
  execute(
    params: CircleManagementReadInboundPortInputDto,
  ): Promise<CircleManagementReadInboundPortOutputDto>;
}
