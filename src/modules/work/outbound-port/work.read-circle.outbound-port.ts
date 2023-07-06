import { Circles } from 'src/database/entities/Circles';

export type WorkReadCircleOutboundPortInputDto = {
  circleId: string;
};

export type WorkReadCircleOutboundPortOutputDto = Circles;

export const WORK_READ_CIRCLE_OUTBOUND_PORT =
  'WORK_READ_CIRCLE_OUTBOUND_PORT' as const;

export interface WorkReadCircleOutboundPort {
  execute(
    params: WorkReadCircleOutboundPortInputDto,
  ): Promise<WorkReadCircleOutboundPortOutputDto>;
}
