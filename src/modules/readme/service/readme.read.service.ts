import { Inject } from '@nestjs/common';
import {
  ReadmeReadInboundPort,
  ReadmeReadInboundPortInputDto,
  ReadmeReadInboundPortOutputDto,
} from '../inbound-port/readme.read.inbound-port';
import {
  README_READ_OUTBOUND_PORT,
  ReadmeReadOutboundPort,
} from '../outbound-port/readme.read.outbound-port';

export class ReadmeReadService implements ReadmeReadInboundPort {
  constructor(
    @Inject(README_READ_OUTBOUND_PORT)
    private readonly readmeReadOutboundport: ReadmeReadOutboundPort,
  ) {}

  read(
    params: ReadmeReadInboundPortInputDto,
  ): Promise<ReadmeReadInboundPortOutputDto> {
    return this.readmeReadOutboundport.execute(params);
  }
}
