import { Circles } from 'src/database/entities/Circles';
import { UsersCircles } from 'src/database/entities/UsersCircles';

export type CircleManagementCreateMemberOutboundPortInputDto = {
  userId: string;
  circleId: string;
  grade: string;
};

export type CircleManagementCreateMemberOutboundPortOutputDto = UsersCircles;

export const CIRCLE_MANAGEMENT_CREATE_MEMBER_OUTBOUND_PORT =
  'CIRCLE_MANAGEMENT_CREATE_MEMBER_OUTBOUND_PORT' as const;

export interface CircleManagementCreateMemberOutboundPort {
  execute(
    params: CircleManagementCreateMemberOutboundPortInputDto,
  ): Promise<CircleManagementCreateMemberOutboundPortOutputDto>;
}
