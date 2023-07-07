export type HashtagDeleteUsersHashtagsInboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagDeleteUsersHashtagsInboundPortOutputDto = {
  hashtagId: string;
};

export const HASHTAG_DELETE_USERS_HASHTAGS_INBOUND_PORT =
  'HASHTAG_DELETE_USERS_HASHTAGS_INBOUND_PORT' as const;

export interface HashtagDeleteUsersHashtagsInboundPort {
  execute(
    params: HashtagDeleteUsersHashtagsInboundPortInputDto,
  ): Promise<HashtagDeleteUsersHashtagsInboundPortOutputDto>;
}
