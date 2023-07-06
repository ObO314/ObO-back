import { Works } from 'src/database/entities/Works';

export type WorkCreateInboundPortInputDto = {
  circleId: string;
  userId: string;
  name: string;
  startTime: Date;
  endTime: Date;
  description: string;
  priority: string;
};

export type WorkCreateInboundPortOutputDto = Works;

export const WORK_CREATE_INBOUND_PORT = 'WORK_CREATE_INBOUND_PORT' as const;

export interface WorkCreateInboundPort {
  execute(
    params: WorkCreateInboundPortInputDto,
  ): Promise<WorkCreateInboundPortOutputDto>;
}
