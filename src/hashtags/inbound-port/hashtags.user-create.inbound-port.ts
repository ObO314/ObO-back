export type HashtagsUserCreateInboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagsUserCreateInboundPortOutputDto = {
  hashtagId: string;
  hashtagName: string;
  mentions: string;
};

export const HASHTAGS_USER_CREATE_INBOUND_PORT =
  'HASHTAGS_USER_CREATE_INBOUND_PORT' as const;

export interface HashtagsUserCreateInboundPort {
  create(
    params: HashtagsUserCreateInboundPortInputDto,
  ): Promise<HashtagsUserCreateInboundPortOutputDto>;
}
