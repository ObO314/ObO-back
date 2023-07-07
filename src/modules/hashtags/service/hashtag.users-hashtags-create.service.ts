import { Inject } from '@nestjs/common';
import {
  HashtagCreateUsersHashtagsInboundPort,
  HashtagCreateUsersHashtagsInboundPortInputDto,
  HashtagCreateUsersHashtagsInboundPortOutputDto,
} from '../inbound-port/hashtag.users-hashtags-create.inbound-port';
import {
  HASHTAG_CREATE_OUTBOUND_PORT,
  HashtagCreateOutboundPort,
} from '../outbound-port/hashtag.create.outbound-port';
import {
  HASHTAG_READ_OUTBOUND_PORT,
  HashtagReadOutboundPort,
} from '../outbound-port/hashtag.read.outbound-port';
import {
  HASHTAG_CREATE_USERS_HASHTAGS_OUTBOUND_PORT,
  HashtagCreateUsersHashTagsOutboundPort,
} from '../outbound-port/hashtag.create-users-hashtags.outbound-port';
import { flatMap, head, map, pipe, toAsync } from '@fxts/core';
import {
  HASHTAG_UPDATE_OUTBOUND_PORT,
  HashtagUpdateOutboundPort,
} from '../outbound-port/hashtag.update.outbound-port';

export class HashtagsUserCreateService
  implements HashtagCreateUsersHashtagsInboundPort
{
  constructor(
    @Inject(HASHTAG_CREATE_OUTBOUND_PORT)
    private readonly HashtagCreateOutboundPort: HashtagCreateOutboundPort,
    @Inject(HASHTAG_READ_OUTBOUND_PORT)
    private readonly HashtagReadOutboundPort: HashtagReadOutboundPort,
    @Inject(HASHTAG_UPDATE_OUTBOUND_PORT)
    private readonly HashtagUpdateUsersHashTagsOutboundPort: HashtagUpdateOutboundPort,
    @Inject(HASHTAG_CREATE_USERS_HASHTAGS_OUTBOUND_PORT)
    private readonly HashtagCreateUsersHashTagsOutboundPort: HashtagCreateUsersHashTagsOutboundPort,
  ) {}

  async execute(
    params: HashtagCreateUsersHashtagsInboundPortInputDto,
  ): Promise<HashtagCreateUsersHashtagsInboundPortOutputDto> {
    // 유저-해시태크 쌍 생성, 반환
    return pipe(
      [params],
      toAsync,
      // 대문자로 변환
      map((params) => {
        return {
          userId: params.userId,
          hashtag: params.hashtag.replace(/\s/g, '').toUpperCase(),
        };
      }),
      // 해시태그 찾아서
      map(async (params) => {
        let hashtag = await this.HashtagReadOutboundPort.execute({
          hashtag: params.hashtag,
        });
        // 없으면 새로 생성
        if (!hashtag) {
          hashtag = await this.HashtagCreateOutboundPort.execute({
            hashtag: params.hashtag,
          });
        }
        return { hashtag, params };
      }),
      // 해시태그 사용에 따른 멘션 +1
      map(async ({ hashtag, params }) => {
        await this.HashtagUpdateUsersHashTagsOutboundPort.execute({
          hashtag: hashtag.id,
          mentions: String(BigInt(hashtag.mentions) + 1n),
        });
        return { hashtag, params };
      }),
      // 유저-해시태크 쌍 생성
      map(async ({ hashtag, params }) => {
        await this.HashtagCreateUsersHashTagsOutboundPort.execute({
          userId: params.userId,
          hashtagId: hashtag.id,
        });
        // 반환
        return {
          hashtagId: hashtag.id,
          hashtagName: hashtag.hashtagName,
          mentions: hashtag.mentions,
        };
      }),
      head,
    );
  }
}
