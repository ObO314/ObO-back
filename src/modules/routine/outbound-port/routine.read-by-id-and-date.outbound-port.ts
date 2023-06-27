import { Routines } from 'src/database/entities/Routines';

export type RoutineReadByIdAndDateOutboundPortInputDto = {
  routineId: string;
  date: string;
};

export type RoutineReadByIdAndDateOutboundPortOutputDto = boolean;

export const ROUTINE_READ_BY_ID_AND_DATE_OUTBOUND_PORT =
  'ROUTINE_READ_BY_ID_AND_DATE_OUTBOUND_PORT' as const;

export interface RoutineReadByIdAndDateOutboundPort {
  execute(
    params: RoutineReadByIdAndDateOutboundPortInputDto,
  ): Promise<RoutineReadByIdAndDateOutboundPortOutputDto>;
}
