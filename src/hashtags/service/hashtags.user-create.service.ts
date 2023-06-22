import { Inject } from '@nestjs/common';
import {
  HashtagsUserCreateInboundPort,
  HashtagsUserCreateInboundPortInputDto,
  HashtagsUserCreateInboundPortOutputDto,
} from '../inbound-port/hashtags.user-create.inbound-port';
import {
  HASHTAGS_USER_CREATE_OUTBOUND_PORT,
  HashtagsUserCreateOutboundPort,
} from '../outbound-port/hashtags.user-create.outbound-port';

export class HashtagsUserCreateService
  implements HashtagsUserCreateInboundPort
{
  constructor(
    @Inject(HASHTAGS_USER_CREATE_OUTBOUND_PORT)
    private readonly hashtagsUserCreateOutboundPort: HashtagsUserCreateOutboundPort,
  ) {}

  async create(
    params: HashtagsUserCreateInboundPortInputDto,
  ): Promise<HashtagsUserCreateInboundPortOutputDto> {
    return this.hashtagsUserCreateOutboundPort.create(params);
  }
}
