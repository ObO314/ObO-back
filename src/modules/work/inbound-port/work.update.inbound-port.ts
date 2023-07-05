import { Works } from 'src/database/entities/Works';

export type WorkUpdateInboundPortInputDto = {
  userId: string;
  circleId: string;
  workId: string;
  name?: string;
  startTime?: Date;
  endTime?: Date;
  description?: string;
  priority?: string;
};

export type WorkUpdateInboundPortOutputDto = Works;

export const WORK_UPDATE_INBOUND_PORT = 'WORK_UPDATE_INBOUND_PORT' as const;

export interface WorkUpdateInboundPort {
  execute(
    params: WorkUpdateInboundPortInputDto,
  ): Promise<WorkUpdateInboundPortOutputDto>;
}
