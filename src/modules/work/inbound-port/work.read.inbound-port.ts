import { Works } from 'src/database/entities/Works';

export type WorkReadInboundPortInputDto = {
  userId: string;
  circleId: string;
  startDate: string;
  endDate: string;
};

export type WorkReadInboundPortOutputDto = Array<Works>;

export const WORK_READ_INBOUND_PORT = 'WORK_READ_INBOUND_PORT' as const;

export interface WorkReadInboundPort {
  execute(
    params: WorkReadInboundPortInputDto,
  ): Promise<WorkReadInboundPortOutputDto>;
}
