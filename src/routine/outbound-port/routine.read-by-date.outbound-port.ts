import { Routines } from 'database/entities/Routines';

export type RoutineReadByDateOutboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByDateOutboundPortOutputDto = Routines[];

export const ROUTINE_READ_BY_DATE_OUTBOUND_PORT =
  'ROUTINE_READ_BY_DATE_OUTBOUND_PORT' as const;

export interface RoutineReadByDateOutboundPort {
  readByDate(
    params: RoutineReadByDateOutboundPortInputDto,
  ): Promise<RoutineReadByDateOutboundPortOutputDto>;
}
