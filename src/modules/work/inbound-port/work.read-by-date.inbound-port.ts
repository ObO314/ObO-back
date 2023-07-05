import { Works } from 'src/database/entities/Works';

export type WorkReadByDateInboundPortInputDto = {
  userId: string;
  circleId: string;
  startTime: Date;
  endTime: Date;
};

export type WorkReadByDateInboundPortOutputDto = Array<Works>;

export const WORK_READ_BY_DATE_INBOUND_PORT =
  'WORK_READ_BY_DATE_INBOUND_PORT' as const;

export interface WorkReadByDateInboundPort {
  execute(
    params: WorkReadByDateInboundPortInputDto,
  ): Promise<WorkReadByDateInboundPortOutputDto>;
}
