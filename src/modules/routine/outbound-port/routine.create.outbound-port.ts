import { Routines } from 'src/database/entities/Routines';

export type RoutineCreateOutboundPortInputDto = {
  user: string;
  name: string;
  description?: string;
};

export type RoutineCreateOutboundPortOutputDto = Routines;

export const ROUTINE_CREATE_OUTBOUND_PORT =
  'ROUTINE_CREATE_OUTBOUND_PORT' as const;

export interface RoutineCreateOutboundPort {
  execute(
    params: RoutineCreateOutboundPortInputDto,
  ): Promise<RoutineCreateOutboundPortOutputDto>;
}
