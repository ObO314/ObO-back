import { Routines } from 'src/database/entities/Routines';

export type RoutineUpdateOutboundPortInputDto = {
  routineId: string;

  userId: string;

  name: string;

  description: string;
};

export type RoutineUpdateOutboundPortOutputDto = Routines;

export const ROUTINE_UPDATE_OUTBOUND_PORT =
  'ROUTINE_UPDATE_OUTBOUND_PORT' as const;

export interface RoutineUpdateOutboundPort {
  execute(
    params: RoutineUpdateOutboundPortInputDto,
  ): Promise<RoutineUpdateOutboundPortOutputDto>;
}
