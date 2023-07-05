import { Works } from 'src/database/entities/Works';

export type WorkReadOutboundPortInputDto = {
  workId: string;
};

export type WorkReadOutboundPortOutputDto = Works;

export const WORK_READ_OUTBOUND_PORT = 'WORK_READ_OUTBOUND_PORT' as const;

export interface WorkReadOutboundPort {
  execute(
    params: WorkReadOutboundPortInputDto,
  ): Promise<WorkReadOutboundPortOutputDto>;
}
