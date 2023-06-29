import { RoutineRecords } from 'src/database/entities/RoutineRecords';

export type RoutineDeleteRecordOutboundPortInputDto = {
  routineId: string;
  date: string;
};

export type RoutineDeleteRecordOutboundPortOutputDto = RoutineRecords;

export const ROUTINE_DELETE_RECORD_OUTBOUND_PORT =
  'ROUTINE_DELETE_RECORD_OUTBOUND_PORT' as const;

export interface RoutineDeleteRecordOutboundPort {
  execute(
    params: RoutineDeleteRecordOutboundPortInputDto,
  ): Promise<RoutineDeleteRecordOutboundPortOutputDto>;
}
