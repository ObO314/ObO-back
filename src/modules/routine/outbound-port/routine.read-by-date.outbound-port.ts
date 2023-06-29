export type RoutineReadByDateOutboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByDateOutboundPortOutputDto = {
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

export const ROUTINE_READ_BY_DATE_OUTBOUND_PORT =
  'ROUTINE_READ_BY_DATE_OUTBOUND_PORT' as const;

export interface RoutineReadByDateOutboundPort {
  readByDate(
    params: RoutineReadByDateOutboundPortInputDto,
  ): Promise<RoutineReadByDateOutboundPortOutputDto>;
}
