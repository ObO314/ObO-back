import { Circles } from 'src/database/entities/Circles';

export type CircleManagementCreateInboundPortInputDto = {
  owner: string;
  name: string;
  description?: string;
  profileImg?: string;
};

export type CircleManagementCreateInboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT =
  'CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT' as const;

export interface CircleManagementCreateInboundPort {
  execute(
    params: CircleManagementCreateInboundPortInputDto,
  ): Promise<CircleManagementCreateInboundPortOutputDto>;
}
