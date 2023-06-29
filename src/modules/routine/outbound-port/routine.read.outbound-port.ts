import { Routines } from 'src/database/entities/Routines';

export type RoutineReadOutboundPortInputDto = {
  userId: string;
  routineId: string;
};

export type RoutineReadOutboundPortOutputDto = Routines;

export const ROUTINE_READ_OUTBOUND_PORT = 'ROUTINE_READ_OUTBOUND_PORT' as const;

export interface RoutineReadOutboundPort {
  execute(
    params: RoutineReadOutboundPortInputDto,
  ): Promise<RoutineReadOutboundPortOutputDto>;
}
