import { Works } from 'src/database/entities/Works';

export type WorkDeleteInboundPortInputDto = {
  userId: string;
  workId: string;
  circleId: string;
};

export type WorkDeleteInboundPortOutputDto = Works;

export const WORK_DELETE_INBOUND_PORT = 'WORK_DELETE_INBOUND_PORT' as const;

export interface WorkDeleteInboundPort {
  execute(
    params: WorkDeleteInboundPortInputDto,
  ): Promise<WorkDeleteInboundPortOutputDto>;
}
