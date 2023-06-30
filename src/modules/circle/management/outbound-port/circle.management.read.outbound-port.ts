import { Circles } from 'src/database/entities/Circles';

export type CircleManagementReadOutboundPortInputDto = {
  circleId: string;
};

export type CircleManagementReadOutboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT =
  'CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT' as const;

export interface CircleManagementReadOutboundPort {
  execute(
    params: CircleManagementReadOutboundPortInputDto,
  ): Promise<CircleManagementReadOutboundPortOutputDto>;
}
