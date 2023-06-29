export type RoutineReadByDateInboundPortInputDto = {
  userId: string;
  date: string;
};

export type RoutineReadByDateInboundPortOutputDto = {
  routine: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  done: boolean;
}[];

export const ROUTINE_READ_BY_DATE_INBOUND_PORT =
  'ROUTINE_READ_BY_DATE_INBOUND_PORT' as const;

export interface RoutineReadByDateInboundPort {
  execute(
    params: RoutineReadByDateInboundPortInputDto,
  ): Promise<RoutineReadByDateInboundPortOutputDto>;
}
