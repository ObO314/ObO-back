export type HashtagsCreateOutboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagsCreateOutboundPortOutputDto = {
  hashtagId: string;
  hashtagName: string;
  mentions: string;
};

export const HASHTAGS_CREATE_OUTBOUND_PORT =
  'HASHTAGS_CREATE_OUTBOUND_PORT' as const;

export interface HashtagsCreateOutboundPort {
  create(
    params: HashtagsCreateOutboundPortInputDto,
  ): Promise<HashtagsCreateOutboundPortOutputDto>;
}
