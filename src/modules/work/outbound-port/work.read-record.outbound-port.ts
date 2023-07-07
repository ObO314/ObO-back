import { WorkRecords } from 'src/database/entities/WorkRecords';

export type WorkReadRecordOutboundPortInputDto = {
  circleId: string;
  workId: string;
  userId: string;
};

export type WorkReadRecordOutboundPortOutputDto = WorkRecords;

export const WORK_READ_RECORD_OUTBOUND_PORT =
  'WORK_READ_RECORD_OUTBOUND_PORT' as const;

export interface WorkReadRecordOutboundPort {
  execute(
    params: WorkReadRecordOutboundPortInputDto,
  ): Promise<WorkReadRecordOutboundPortOutputDto>;
}
