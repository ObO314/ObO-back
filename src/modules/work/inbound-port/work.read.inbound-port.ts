import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { WorkPriority } from 'src/database/entities/WorkPriority';
import { Works } from 'src/database/entities/Works';

export type WorkReadInboundPortInputDto = {
  userId: string;
  circleId: string;
  workId: string;
};

export type WorkReadInboundPortOutputDto = {
  id: string;
  circle: Circles;
  name: string;
  startTime: Date;
  endTime: Date;
  description: string;
  priority: WorkPriority;
  creator: Users;
  targets: string;
};

export const WORK_READ_INBOUND_PORT = 'WORK_READ_INBOUND_PORT' as const;

export interface WorkReadInboundPort {
  execute(
    params: WorkReadInboundPortInputDto,
  ): Promise<WorkReadInboundPortOutputDto>;
}
