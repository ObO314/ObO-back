import { WorkRecords } from 'src/database/entities/WorkRecords';

export type WorkDeleteRecordOutboundPortInputDto = {
  circleId: string;
  workId: string;
  userId: string;
  date: string;
};

export type WorkDeleteRecordOutboundPortOutputDto = WorkRecords;

export const WORK_DELETE_RECORD_OUTBOUND_PORT =
  'WORK_DELETE_RECORD_OUTBOUND_PORT' as const;

export interface WorkDeleteRecordOutboundPort {
  execute(
    params: WorkDeleteRecordOutboundPortInputDto,
  ): Promise<WorkDeleteRecordOutboundPortOutputDto>;
}
