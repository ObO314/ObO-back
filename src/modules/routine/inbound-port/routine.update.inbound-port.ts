import { Routines } from 'src/database/entities/Routines';

export type RoutineUpdateInboundPortInputDto = {
  routineId: string;

  userId: string;

  name: string;

  description: string;
};

export type RoutineUpdateInboundPortOutputDto = Routines;

export const ROUTINE_UPDATE_INBOUND_PORT =
  'ROUTINE_UPDATE_INBOUND_PORT' as const;

export interface RoutineUpdateInboundPort {
  execute(
    params: RoutineUpdateInboundPortInputDto,
  ): Promise<RoutineUpdateInboundPortOutputDto>;
}
