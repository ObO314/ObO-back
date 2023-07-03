import { Circles } from 'src/database/entities/Circles';

export type CircleManagementDeleteOutboundPortInputDto = {
  circleId: string;
};

export type CircleManagementDeleteOutboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT =
  'CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT' as const;

export interface CircleManagementDeleteOutboundPort {
  execute(
    params: CircleManagementDeleteOutboundPortInputDto,
  ): Promise<CircleManagementDeleteOutboundPortOutputDto>;
}
