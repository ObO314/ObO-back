export type WorkReadRecordsOutboundPortInputDto = {
  circleId: string;
  workId: string;
};

export type WorkReadRecordsOutboundPortOutputDto = number;

export const WORK_READ_RECORDS_OUTBOUND_PORT =
  'WORK_READ_RECORDS_OUTBOUND_PORT' as const;

export interface WorkReadRecordsOutboundPort {
  execute(
    params: WorkReadRecordsOutboundPortInputDto,
  ): Promise<WorkReadRecordsOutboundPortOutputDto>;
}
