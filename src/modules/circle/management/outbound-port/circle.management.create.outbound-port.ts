import { Circles } from 'src/database/entities/Circles';

export type CircleManagementCreateOutboundPortInputDto = {
  owner: string;
  name: string;
  description?: string;
  profileImg?: string;
  creationDate: string;
};

export type CircleManagementCreateOutboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT =
  'CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT' as const;

export interface CircleManagementCreateOutboundPort {
  execute(
    params: CircleManagementCreateOutboundPortInputDto,
  ): Promise<CircleManagementCreateOutboundPortOutputDto>;
}
