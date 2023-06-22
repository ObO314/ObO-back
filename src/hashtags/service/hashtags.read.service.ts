import { Inject } from '@nestjs/common';
import {
  HashtagsUserReadInboundPort,
  HashtagsUserReadInboundPortInputDto,
  HashtagsUserReadInboundPortOutputDto,
} from '../inbound-port/hashtags.read.inbound-port';
import {
  HASHTAGS_USER_READ_OUTBOUND_PORT,
  HashtagsUserReadOutboundPort,
} from '../outbound-port/hashtags.user-read.outbound-port';

export class HashtagsUserReadService implements HashtagsUserReadInboundPort {
  constructor(
    @Inject(HASHTAGS_USER_READ_OUTBOUND_PORT)
    private readonly hashtagsUserReadOutboundPort: HashtagsUserReadOutboundPort,
  ) {}

  async read(
    params: HashtagsUserReadInboundPortInputDto,
  ): Promise<HashtagsUserReadInboundPortOutputDto> {
    return this.hashtagsUserReadOutboundPort.read(params);
  }
}
