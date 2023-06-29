import { Routines } from 'src/database/entities/Routines';

export type RoutineCreateInboundPortInputDto = {
  userId: string;
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
};

export type RoutineCreateInboundPortOutputDto = {
  userId: string;
  routineId: string;
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

export const ROUTINE_CREATE_INBOUND_PORT =
  'ROUTINE_CREATE_INBOUND_PORT' as const;

export interface RoutineCreateInboundPort {
  execute(
    params: RoutineCreateInboundPortInputDto,
  ): Promise<RoutineCreateInboundPortOutputDto>;
}
