import { CircleApplication } from 'src/database/entities/CircleApplication';

export type CircleMemberReadApplicationsOutboundPortInputDto = {
  circleId: string;
};
export type CircleMemberReadApplicationsOutboundPortOutputDto =
  Array<CircleApplication>;

export const CIRCLE_MEMBER_READ_APPLICATIONS_OUTBOUND_PORT =
  'CIRCLE_MEMBER_READ_APPLICATIONS_OUTBOUND_PORT' as const;

export interface CircleMemberReadApplicationsOutboundPort {
  execute(
    params: CircleMemberReadApplicationsOutboundPortInputDto,
  ): Promise<CircleMemberReadApplicationsOutboundPortOutputDto>;
}
