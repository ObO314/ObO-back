export type HashtagsUserDeleteInboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagsUserDeleteInboundPortOutputDto = {
  hashtagId: string;
};

export const HASHTAGS_USER_DELETE_INBOUND_PORT =
  'HASHTAGS_USER_DELETE_INBOUND_PORT' as const;

export interface HashtagsUserDeleteInboundPort {
  delete(
    params: HashtagsUserDeleteInboundPortInputDto,
  ): Promise<HashtagsUserDeleteInboundPortOutputDto>;
}
