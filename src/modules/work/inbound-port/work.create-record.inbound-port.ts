import { WorkRecords } from 'src/database/entities/WorkRecords';

export type WorkCreateRecordInboundPortInputDto = {
  circleId: string;
  workId: string;
  userId: string;
  date: string;
};

export type WorkCreateRecordInboundPortOutputDto = WorkRecords;

export const WORK_CREATE_RECORD_INBOUND_PORT =
  'WORK_CREATE_RECORD_INBOUND_PORT' as const;

export interface WorkCreateRecordInboundPort {
  execute(
    params: WorkCreateRecordInboundPortInputDto,
  ): Promise<WorkCreateRecordInboundPortOutputDto>;
}
