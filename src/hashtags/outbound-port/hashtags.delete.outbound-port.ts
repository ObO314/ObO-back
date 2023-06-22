export type HashtagsDeleteOutboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagsDeleteOutboundPortOutputDto = {
  hashtagId: string;
};

export const HASHTAGS_DELETE_OUTBOUND_PORT =
  'HASHTAGS_DELETE_OUTBOUND_PORT' as const;

export interface HashtagsDeleteOutboundPort {
  delete(
    params: HashtagsDeleteOutboundPortInputDto,
  ): Promise<HashtagsDeleteOutboundPortOutputDto>;
}
