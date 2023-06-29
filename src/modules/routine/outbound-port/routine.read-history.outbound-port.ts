import { RoutineHistories } from 'src/database/entities/RoutineHistories';

export type RoutineReadHistoryOutboundPortInputDto = {
  routineId: string;
  date: string;
};

export type RoutineReadHistoryOutboundPortOutputDto = RoutineHistories;

export const ROUTINE_READ_HISTORY_OUTBOUND_PORT =
  'ROUTINE_READ_HISTORY_OUTBOUND_PORT' as const;

export interface RoutineReadHistoryOutboundPort {
  execute(
    params: RoutineReadHistoryOutboundPortInputDto,
  ): Promise<RoutineReadHistoryOutboundPortOutputDto>;
}
