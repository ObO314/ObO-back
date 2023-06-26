export type RoutineUpdateByIdOutboundPortInputDto = {};

export type RoutineUpdateByIdOutboundPortOutputDto = {};

export const ROUTINE_UPDATE_BY_ID_OUTBOUND_PORT =
  'ROUTINE_UPDATE_BY_ID_OUTBOUND_PORT' as const;

export interface RoutineUpdateByIdOutboundPort {
  updateById(
    params: RoutineUpdateByIdOutboundPortInputDto,
  ): Promise<RoutineUpdateByIdOutboundPortOutputDto>;
}
