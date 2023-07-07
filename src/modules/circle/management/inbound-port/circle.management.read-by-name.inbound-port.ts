import { Circles } from 'src/database/entities/Circles';

export type CircleManagementReadByNameInboundPortInputDto = {
  name: string;
};
export type CircleManagementReadByNameInboundPortOutputDto = Array<Circles>;

export const CIRCLE_MANAGEMENT_READ_BY_NAME_INBOUND_PORT =
  'CIRCLE_MANAGEMENT_READ_BY_NAME_INBOUND_PORT' as const;

export interface CircleManagementReadByNameInboundPort {
  execute(
    params: CircleManagementReadByNameInboundPortInputDto,
  ): Promise<CircleManagementReadByNameInboundPortOutputDto>;
}
