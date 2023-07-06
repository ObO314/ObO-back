import { WorkRecords } from 'src/database/entities/WorkRecords';

export type WorkDeleteRecordInboundPortInputDto = {
  circleId: string;
  workId: string;
  userId: string;
  date: string;
};

export type WorkDeleteRecordInboundPortOutputDto = WorkRecords;

export const WORK_DELETE_RECORD_INBOUND_PORT =
  'WORK_DELETE_RECORD_INBOUND_PORT' as const;

export interface WorkDeleteRecordInboundPort {
  execute(
    params: WorkDeleteRecordInboundPortInputDto,
  ): Promise<WorkDeleteRecordInboundPortOutputDto>;
}
