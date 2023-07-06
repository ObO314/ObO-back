import { Circles } from 'src/database/entities/Circles';
import { Users } from 'src/database/entities/Users';
import { WorkPriority } from 'src/database/entities/WorkPriority';
import { Works } from 'src/database/entities/Works';

export type WorkReadByDateInboundPortInputDto = {
  userId: string;
  circleId: string;
  startTime: Date;
  endTime: Date;
};

export type WorkReadByDateInboundPortOutputDto = Array<{
  id: string;
  circle: Circles;
  name: string;
  startTime: Date;
  endTime: Date;
  description: string;
  priority: WorkPriority;
  creator: Users;
  targets: string;
  progress: string;
  done: boolean;
}>;

export const WORK_READ_BY_DATE_INBOUND_PORT =
  'WORK_READ_BY_DATE_INBOUND_PORT' as const;

export interface WorkReadByDateInboundPort {
  execute(
    params: WorkReadByDateInboundPortInputDto,
  ): Promise<WorkReadByDateInboundPortOutputDto>;
}
