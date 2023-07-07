import { Inject } from '@nestjs/common';

import {
  HASHTAG_READ_USERS_HASHTAGS_OUTBOUND_PORT,
  HashtagReadUsersHashtagsOutboundPort,
} from '../outbound-port/hashtag.read-users-hashtags.outbound-port';
import {
  HashtagReadUsersHashtagsInboundPort,
  HashtagReadUsersHashtagsInboundPortInputDto,
  HashtagReadUsersHashtagsInboundPortOutputDto,
} from '../inbound-port/hashtag.users-hashtags-read.inbound-port';

export class HashtagsUserReadService
  implements HashtagReadUsersHashtagsInboundPort
{
  constructor(
    @Inject(HASHTAG_READ_USERS_HASHTAGS_OUTBOUND_PORT)
    private readonly hashtagReadUsersHashtagsOutboundPort: HashtagReadUsersHashtagsOutboundPort,
  ) {}

  async execute(
    params: HashtagReadUsersHashtagsInboundPortInputDto,
  ): Promise<HashtagReadUsersHashtagsInboundPortOutputDto> {
    return await this.hashtagReadUsersHashtagsOutboundPort.execute(params);
  }
}
