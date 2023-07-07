import { UsersCircles } from 'src/database/entities/UsersCircles';

export type WorkFindMemberOutboundPortInputDto = {
  circleId: string;
  userId: string;
};
export type WorkFindMemberOutboundPortOutputDto = UsersCircles;

export const WORK_FIND_MEMBER_OUTBOUND_PORT =
  'WORK_FIND_MEMBER_OUTBOUND_PORT' as const;

export interface WorkFindMemberOutboundPort {
  execute(
    params: WorkFindMemberOutboundPortInputDto,
  ): Promise<WorkFindMemberOutboundPortOutputDto>;
}
