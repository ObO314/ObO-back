import { Routines } from 'src/database/entities/Routines';

export type RoutineReadByIdInboundPortInputDto = { routineId: string };

export type RoutineReadByIdInboundPortOutputDto = Routines;

export const ROUTINE_READ_BY_ID_INBOUND_PORT =
  'ROUTINE_READ_BY_ID_INBOUND_PORT' as const;

export interface RoutineReadByIdInboundPort {
  readById(
    params: RoutineReadByIdInboundPortInputDto,
  ): Promise<RoutineReadByIdInboundPortOutputDto>;
}
