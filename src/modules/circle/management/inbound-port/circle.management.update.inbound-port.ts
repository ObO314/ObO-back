import { Circles } from 'src/database/entities/Circles';

export type CircleManagementUpdateInboundPortInputDto = {
  userId: string;
  circleId: string;
  name?: string;
  description?: string;
  profileImg?: string;
  rules?: string;
  isOpen?: boolean;
};

export type CircleManagementUpdateInboundPortOutputDto = Circles;

export const CIRCLE_MANAGEMENT_UPDATE_INBOUND_PORT =
  'CIRCLE_MANAGEMENT_UPDATE_INBOUND_PORT' as const;

export interface CircleManagementUpdateInboundPort {
  execute(
    params: CircleManagementUpdateInboundPortInputDto,
  ): Promise<CircleManagementUpdateInboundPortOutputDto>;
}
