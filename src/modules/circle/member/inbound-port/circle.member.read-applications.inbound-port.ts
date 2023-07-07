import { CircleApplication } from 'src/database/entities/CircleApplication';

export type CircleMemberReadApplicationsInboundPortInputDto = {
  userId: string;
  circleId: string;
};
export type CircleMemberReadApplicationsInboundPortOutputDto =
  Array<CircleApplication>;

export const CIRCLE_MEMBER_READ_APPLICATIONS_INBOUND_PORT =
  'CIRCLE_MEMBER_READ_APPLICATIONS_INBOUND_PORT' as const;

export interface CircleMemberReadApplicationsInboundPort {
  execute(
    params: CircleMemberReadApplicationsInboundPortInputDto,
  ): Promise<CircleMemberReadApplicationsInboundPortOutputDto>;
}
