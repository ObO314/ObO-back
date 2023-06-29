export type RoutineReadRecordByDateOutboundPortInputDto = {
  routineId: string;
  date: string;
};

export type RoutineReadRecordByDateOutboundPortOutputDto = boolean;

export const ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT =
  'ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT' as const;

export interface RoutineReadRecordByDateOutboundPort {
  execute(
    params: RoutineReadRecordByDateOutboundPortInputDto,
  ): Promise<RoutineReadRecordByDateOutboundPortOutputDto>;
}
