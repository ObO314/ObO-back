import { RoutineRecords } from 'src/database/entities/RoutineRecords';

export type RoutineCreateRecordInboundPortInputDto = {
  userId: string;
  routineId: string;
  date: string;
};

export type RoutineCreateRecordInboundPortOutputDto = RoutineRecords;

export const ROUTINE_CREATE_RECORD_INBOUND_PORT =
  'ROUTINE_CREATE_RECORD_INBOUND_PORT' as const;

export interface RoutineCreateRecordInboundPort {
  execute(
    params: RoutineCreateRecordInboundPortInputDto,
  ): Promise<RoutineCreateRecordInboundPortOutputDto>;
}
