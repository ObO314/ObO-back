import { RoutineRecords } from 'src/database/entities/RoutineRecords';

export type RoutineCreateRecordOutboundPortInputDto = {
  routineId: string;
  date: string;
};

export type RoutineCreateRecordOutboundPortOutputDto = RoutineRecords;

export const ROUTINE_CREATE_RECORD_OUTBOUND_PORT =
  'ROUTINE_CREATE_RECORD_OUTBOUND_PORT' as const;

export interface RoutineCreateRecordOutboundPort {
  execute(
    params: RoutineCreateRecordOutboundPortInputDto,
  ): Promise<RoutineCreateRecordOutboundPortOutputDto>;
}
