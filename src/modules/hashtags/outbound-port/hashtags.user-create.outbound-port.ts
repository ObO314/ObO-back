export type HashtagsUserCreateOutboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagsUserCreateOutboundPortOutputDto = {
  hashtagId: string;
  hashtagName: string;
  mentions: string;
};

export const HASHTAGS_USER_CREATE_OUTBOUND_PORT =
  'HASHTAGS_USER_CREATE_OUTBOUND_PORT' as const;

export interface HashtagsUserCreateOutboundPort {
  create(
    params: HashtagsUserCreateOutboundPortInputDto,
  ): Promise<HashtagsUserCreateOutboundPortOutputDto>;
}
