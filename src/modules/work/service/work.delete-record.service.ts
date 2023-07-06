import { Inject } from '@nestjs/common';
import {
  WorkDeleteRecordInboundPort,
  WorkDeleteRecordInboundPortInputDto,
  WorkDeleteRecordInboundPortOutputDto,
} from '../inbound-port/work.delete-record.inbound-port';
import {
  WORK_DELETE_RECORD_OUTBOUND_PORT,
  WorkDeleteRecordOutboundPort,
} from '../outbound-port/work.delete-record.outbound-port';

export class WorkDeleteRecordService implements WorkDeleteRecordInboundPort {
  constructor(
    @Inject(WORK_DELETE_RECORD_OUTBOUND_PORT)
    private readonly workDeleteRecordOutboundPort: WorkDeleteRecordOutboundPort,
  ) {}
  async execute(
    params: WorkDeleteRecordInboundPortInputDto,
  ): Promise<WorkDeleteRecordInboundPortOutputDto> {
    return await this.workDeleteRecordOutboundPort.execute(params);
  }
}
