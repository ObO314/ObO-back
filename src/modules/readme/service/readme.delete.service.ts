import { Inject } from '@nestjs/common';
import {
  ReadmeDeleteInboundPort,
  ReadmeDeleteInboundPortInputDto,
  ReadmeDeleteInboundPortOutputDto,
} from '../inbound-port/readme.delete.inbound-port';
import {
  README_DELETE_OUTBOUND_PORT,
  ReadmeDeleteOutboundPort,
} from '../outbound-port/readme.delete.outbound-port';

export class ReadmeDeleteService implements ReadmeDeleteInboundPort {
  constructor(
    @Inject(README_DELETE_OUTBOUND_PORT)
    private readonly readmeDeleteOutboundPort: ReadmeDeleteOutboundPort,
  ) {}
  delete(
    params: ReadmeDeleteInboundPortInputDto,
  ): Promise<ReadmeDeleteInboundPortOutputDto> {
    return this.readmeDeleteOutboundPort.execute(params);
  }
}
