import { RoutineHistories } from 'src/database/entities/RoutineHistories';
import { Routines } from 'src/database/entities/Routines';

export type RoutineReadByUserAndDateOutboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByUserAndDateOutboundPortOutputDto = {
  id: string;
  routine: string;
  user: string;
  name: string;
  start_time: string;
  end_time: string;
  description: string;
  updated_at: string;
  is_active: boolean;
}[];

export const ROUTINE_READ_BY_USER_AND_DATE_OUTBOUND_PORT =
  'ROUTINE_READ_BY_USER_AND_DATE_OUTBOUND_PORT' as const;

export interface RoutineReadByUserAndDateOutboundPort {
  readByDate(
    params: RoutineReadByUserAndDateOutboundPortInputDto,
  ): Promise<RoutineReadByUserAndDateOutboundPortOutputDto>;
}
