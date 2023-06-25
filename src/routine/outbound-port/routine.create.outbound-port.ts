import { Routines } from 'database/entities/Routines';

export type RoutineCreateOutboundPortInputDto = {
  userId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
};

export type RoutineCreateOutboundPortOutputDto = Routines;

export const ROUTINE_CREATE_OUTBOUND_PORT =
  'ROUTINE_CREATE_OUTBOUND_PORT' as const;

export interface RoutineCreateOutboundPort {
  create(
    params: RoutineCreateOutboundPortInputDto,
  ): Promise<RoutineCreateOutboundPortOutputDto>;
}
