import { Inject } from '@nestjs/common';
import {
  ReadmeUpdateInboundPort,
  ReadmeUpdateInboundPortInputDto,
  ReadmeUpdateInboundPortOutputDto,
} from '../inbound-port/readme.update.inbound-port';
import {
  README_UPDATE_OUTBOUND_PORT,
  ReadmeUpdateOutboundPort,
} from '../outbound-port/readme.update.outbound-port';

export class ReadmeUpdateService implements ReadmeUpdateInboundPort {
  constructor(
    @Inject(README_UPDATE_OUTBOUND_PORT)
    private readonly readmeUpdateOutboundPort: ReadmeUpdateOutboundPort,
  ) {}

  async update(
    params: ReadmeUpdateInboundPortInputDto,
  ): Promise<ReadmeUpdateInboundPortOutputDto> {
    return this.readmeUpdateOutboundPort.update(params);
  }
}
