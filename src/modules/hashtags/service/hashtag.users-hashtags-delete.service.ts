import { Inject } from '@nestjs/common';

import {
  HASHTAG_DELETE_USERS_HASHTAGS_OUTBOUND_PORT,
  HashtagDeleteUsersHashtagsOutboundPort,
} from '../outbound-port/hashtag.delete-users-hashtags.outbound-port';
import {
  HashtagDeleteUsersHashtagsInboundPort,
  HashtagDeleteUsersHashtagsInboundPortInputDto,
  HashtagDeleteUsersHashtagsInboundPortOutputDto,
} from '../inbound-port/hashtag.users-hashtags-delete.inbound-port';

export class HashtagsUserDeleteSerivce
  implements HashtagDeleteUsersHashtagsInboundPort
{
  constructor(
    @Inject(HASHTAG_DELETE_USERS_HASHTAGS_OUTBOUND_PORT)
    private readonly hashtagDeleteUsersHashtagsOutboundPort: HashtagDeleteUsersHashtagsOutboundPort,
  ) {}

  async execute(
    params: HashtagDeleteUsersHashtagsInboundPortInputDto,
  ): Promise<HashtagDeleteUsersHashtagsInboundPortOutputDto> {
    const userId = params.userId;
    const trimmedHashtag = params.hashtag.replace(/\s/g, '').toUpperCase();
    return this.hashtagDeleteUsersHashtagsOutboundPort.execute({
      userId: userId,
      hashtag: trimmedHashtag,
    });
  }
}
