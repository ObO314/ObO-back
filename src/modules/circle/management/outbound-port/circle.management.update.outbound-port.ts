import { Circles } from 'src/database/entities/Circles';

export type CircleManagementUpdateOutboundPortInputDto = Circles;

export type CircleManagementUpdateOutboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_UPDATE_OUTBOUND_PORT =
  'CIRCLE_MANAGEMENT_UPDATE_OUTBOUND_PORT' as const;

export interface CircleManagementUpdateOutboundPort {
  execute(
    params: CircleManagementUpdateOutboundPortInputDto,
  ): Promise<CircleManagementUpdateOutboundPortOutputDto>;
}
