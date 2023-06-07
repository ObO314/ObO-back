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
    const userId = params.userId;
    const trimmedHashtag = params.hashtag.replace(/\s/g, '').toUpperCase();
    return this.hashtagsUserCreateOutboundPort.create({
      userId: userId,
      hashtag: trimmedHashtag,
    });
  }
}
