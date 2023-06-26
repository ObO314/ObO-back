import { Inject } from '@nestjs/common';
import {
  HashtagsUserDeleteInboundPort,
  HashtagsUserDeleteInboundPortInputDto,
  HashtagsUserDeleteInboundPortOutputDto,
} from '../inbound-port/hashtags.user-delete.inbound-port';
import {
  HASHTAGS_USER_DELETE_OUTBOUND_PORT,
  HashtagsUserDeleteOutboundPort,
} from '../outbound-port/hashtags.user-delete.outbound-port';

export class HashtagsUserDeleteSerivce
  implements HashtagsUserDeleteInboundPort
{
  constructor(
    @Inject(HASHTAGS_USER_DELETE_OUTBOUND_PORT)
    private readonly hashtagsUserDeleteOutboundPort: HashtagsUserDeleteOutboundPort,
  ) {}

  delete(
    params: HashtagsUserDeleteInboundPortInputDto,
  ): Promise<HashtagsUserDeleteInboundPortOutputDto> {
    const userId = params.userId;
    const trimmedHashtag = params.hashtag.replace(/\s/g, '').toUpperCase();
    return this.hashtagsUserDeleteOutboundPort.delete({
      userId: userId,
      hashtag: trimmedHashtag,
    });
  }
}
