import { Routines } from 'src/database/entities/Routines';

export type RoutineReadByUserOutboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByUserOutboundPortOutputDto = Routines[];

export const ROUTINE_READ_BY_USER_OUTBOUND_PORT =
  'ROUTINE_READ_BY_USER_OUTBOUND_PORT' as const;

export interface RoutineReadByUserOutboundPort {
  readByUser(
    params: RoutineReadByUserOutboundPortInputDto,
  ): Promise<RoutineReadByUserOutboundPortOutputDto>;
}
