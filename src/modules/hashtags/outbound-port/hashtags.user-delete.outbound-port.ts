export type HashtagsUserDeleteOutboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagsUserDeleteOutboundPortOutputDto = {
  hashtagId: string;
};

export const HASHTAGS_USER_DELETE_OUTBOUND_PORT =
  'HASHTAGS_USER_DELETE_OUTBOUND_PORT' as const;

export interface HashtagsUserDeleteOutboundPort {
  delete(
    params: HashtagsUserDeleteOutboundPortInputDto,
  ): Promise<HashtagsUserDeleteOutboundPortOutputDto>;
}
