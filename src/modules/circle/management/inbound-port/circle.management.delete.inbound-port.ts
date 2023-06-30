import { Circles } from 'src/database/entities/Circles';

export type CircleManagementDeleteInboundPortInputDto = {
  circle: string;
  user: string;
  name: string;
  description?: string;
  profileImg?: string;
};

export type CircleManagementDeleteInboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT =
  'CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT' as const;

export interface CircleManagementDeleteInboundPort {
  execute(
    params: CircleManagementDeleteInboundPortInputDto,
  ): Promise<CircleManagementDeleteInboundPortOutputDto>;
}
