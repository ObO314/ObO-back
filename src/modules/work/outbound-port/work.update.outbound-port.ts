import { Works } from 'src/database/entities/Works';

export type WorkUpdateOutboundPortInputDto = {
  workId: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  priority?: string;
};

export type WorkUpdateOutboundPortOutputDto = Works;

export const WORK_UPDATE_OUTBOUND_PORT = 'WORK_UPDATE_OUTBOUND_PORT' as const;

export interface WorkUpdateOutboundPort {
  execute(
    params: WorkUpdateOutboundPortInputDto,
  ): Promise<WorkUpdateOutboundPortOutputDto>;
}
