export type RoutineCreateInboundPortInputDto = {
  userId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
};

export type RoutineCreateInboundPortOutputDto = {};

export const ROUTINE_CREATE_INBOUND_PORT =
  'ROUTINE_CREATE_INBOUND_PORT' as const;

export interface RoutineCreateInboundPort {
  create(
    params: RoutineCreateInboundPortInputDto,
  ): Promise<RoutineCreateInboundPortOutputDto>;
}
