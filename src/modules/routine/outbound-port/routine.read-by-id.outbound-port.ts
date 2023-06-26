import { Routines } from 'src/database/entities/Routines';

export type RoutineReadByIdOutboundPortInputDto = { routineId: string };

export type RoutineReadByIdOutboundPortOutputDto = Routines;

export const ROUTINE_READ_BY_ID_OUTBOUND_PORT =
  'ROUTINE_READ_BY_ID_OUTBOUND_PORT' as const;

export interface RoutineReadByIdOutboundPort {
  readById(
    params: RoutineReadByIdOutboundPortInputDto,
  ): Promise<RoutineReadByIdOutboundPortOutputDto>;
}
