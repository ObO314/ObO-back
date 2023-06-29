export type RoutineDeleteRecordInboundPortInputDto = {
  userId: string;
  routineId: string;
  date: string;
};

export type RoutineDeleteRecordInboundPortOutputDto = {};

export const ROUTINE_DELETE_RECORD_INBOUND_PORT =
  'ROUTINE_DELETE_RECORD_INBOUND_PORT' as const;

export interface RoutineDeleteRecordInboundPort {
  execute(
    params: RoutineDeleteRecordInboundPortInputDto,
  ): Promise<RoutineDeleteRecordInboundPortOutputDto>;
}
