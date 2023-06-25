import { Routines } from 'database/entities/Routines';

export type RoutineReadByDateInboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByDateInboundPortOutputDto = Routines[];

export const ROUTINE_READ_BY_DATE_INBOUND_PORT =
  'ROUTINE_READ_BY_DATE_INBOUND_PORT' as const;

export interface RoutineReadByDateInboundPort {
  readByDate(
    params: RoutineReadByDateInboundPortInputDto,
  ): Promise<RoutineReadByDateInboundPortOutputDto>;
}
