import { Works } from 'src/database/entities/Works';

export type WorkCreateOutboundPortInputDto = {
  circleId: string;
  userId: string;
  name: string;
  startTime: Date;
  endTime: Date;
  description: string;
  priority: string;
};

export type WorkCreateOutboundPortOutputDto = Works;

export const WORK_CREATE_OUTBOUND_PORT = 'WORK_CREATE_OUTBOUND_PORT' as const;

export interface WorkCreateOutboundPort {
  execute(
    params: WorkCreateOutboundPortInputDto,
  ): Promise<WorkCreateOutboundPortOutputDto>;
}
