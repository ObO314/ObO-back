import { Circles } from 'src/database/entities/Circles';

export type CircleManagementReadByNameOutboundPortInputDto = {
  name: string;
};
export type CircleManagementReadByNameOutboundPortOutputDto = Array<Circles>;
export const CIRCLE_MANAGEMENT_READ_BY_NAME_OUTBOUND_PORT =
  'CIRCLE_MANAGEMENT_READ_BY_NAME_OUTBOUND_PORT' as const;

export interface CircleManagementReadByNameOutboundPort {
  execute(
    params: CircleManagementReadByNameOutboundPortInputDto,
  ): Promise<CircleManagementReadByNameOutboundPortOutputDto>;
}
