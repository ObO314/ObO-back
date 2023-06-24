import { Routines } from 'src/database/entities/Routines';

export type RoutineReadByUserInboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByUserInboundPortOutputDto = Routines[];

export const ROUTINE_READ_BY_USER_INBOUND_PORT =
  'ROUTINE_READ_BY_USER_INBOUND_PORT' as const;

export interface RoutineReadByUserInboundPort {
  readByUser(
    params: RoutineReadByUserInboundPortInputDto,
  ): Promise<RoutineReadByUserInboundPortOutputDto>;
}
