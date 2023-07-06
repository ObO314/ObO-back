import { Works } from 'src/database/entities/Works';

export type WorkDeleteOutboundPortInputDto = {
  userId: string;
  workId: string;
  circleId: string;
};

export type WorkDeleteOutboundPortOutputDto = Works;

export const WORK_DELETE_OUTBOUND_PORT = 'WORK_DELETE_OUTBOUND_PORT' as const;

export interface WorkDeleteOutboundPort {
  execute(
    params: WorkDeleteOutboundPortInputDto,
  ): Promise<WorkDeleteOutboundPortOutputDto>;
}
