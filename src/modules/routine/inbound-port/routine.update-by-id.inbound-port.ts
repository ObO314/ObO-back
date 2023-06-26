export type RoutineUpdateByIdInboundPortInputDto = {};

export type RoutineUpdateByIdInboundPortOutputDto = {};

export const ROUTINE_UPDATE_BY_ID_INBOUND_PORT =
  'ROUTINE_UPDATE_BY_ID_INBOUND_PORT' as const;

export interface RoutineUpdateByIdInboundPort {
  updateById(
    params: RoutineUpdateByIdInboundPortInputDto,
  ): Promise<RoutineUpdateByIdInboundPortOutputDto>;
}
