export type RoutineCreateOutboundPortInputDto = {};

export type RoutineCreateOutboundPortOutputDto = {};

export const ROUTINE_CREATE_OUTBOUND_PORT =
  'ROUTINE_CREATE_OUTBOUND_PORT' as const;

export interface RoutineCreateOutboundPort {
  create(
    params: RoutineCreateOutboundPortInputDto,
  ): Promise<RoutineCreateOutboundPortOutputDto>;
}
