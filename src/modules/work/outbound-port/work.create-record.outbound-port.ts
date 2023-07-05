import { WorkRecords } from 'src/database/entities/WorkRecords';

export type WorkCreateRecordOutboundPortInputDto = {
  circleId: string;
  workId: string;
  userId: string;
  date: string;
};

export type WorkCreateRecordOutboundPortOutputDto = WorkRecords;

export const WORK_CREATE_RECORD_OUTBOUND_PORT =
  'WORK_CREATE_OUTBOUND_PORT' as const;

export interface WorkCreateRecordOutboundPort {
  execute(
    params: WorkCreateRecordOutboundPortInputDto,
  ): Promise<WorkCreateRecordOutboundPortOutputDto>;
}
