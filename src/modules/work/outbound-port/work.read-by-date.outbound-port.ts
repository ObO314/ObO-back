import { Works } from 'src/database/entities/Works';

export type WorkReadByDateOutboundPortInputDto = {
  circleId: string;
  startDate: string;
  endDate: string;
};

export type WorkReadByDateOutboundPortOutputDto = Array<Works>;

export const WORK_READ_BY_DATE_OUTBOUND_PORT =
  'WORK_READ_BY_DATE_OUTBOUND_PORT' as const;

export interface WorkReadByDateOutboundPort {
  execute(
    params: WorkReadByDateOutboundPortInputDto,
  ): Promise<WorkReadByDateOutboundPortOutputDto>;
}
