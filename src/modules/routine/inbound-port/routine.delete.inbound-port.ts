import { RoutineHistories } from 'src/database/entities/RoutineHistories';
import { Routines } from 'src/database/entities/Routines';

export type RoutineDeleteInboundPortInputDto = {
  userId: string;
  routineId: string;
};

export type RoutineDeleteInboundPortOutputDto = RoutineHistories;

export const ROUTINE_DELETE_INBOUND_PORT =
  'ROUTINE_DELETE_OUTBOUND_PORT' as const;

export interface RoutineDeleteInboundPort {
  execute(
    params: RoutineDeleteInboundPortInputDto,
  ): Promise<RoutineDeleteInboundPortOutputDto>;
}
