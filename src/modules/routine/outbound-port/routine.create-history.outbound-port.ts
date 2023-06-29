import { RoutineHistories } from 'src/database/entities/RoutineHistories';

export type RoutineCreateHistoryOutboundPortInputDto = {
  routine: string;

  updatedAt: string;

  startTime: string;

  endTime: string;

  user: string;

  isActive: boolean;
};

export type RoutineCreateHistoryOutboundPortOutputDto = RoutineHistories;

export const ROUTINE_CREATE_HISTORY_OUTBOUND_PORT =
  'ROUTINE_CREATE_HISTORY_OUTBOUND_PORT' as const;

export interface RoutineCreateHistoryOutboundPort {
  execute(
    params: RoutineCreateHistoryOutboundPortInputDto,
  ): Promise<RoutineCreateHistoryOutboundPortOutputDto>;
}
