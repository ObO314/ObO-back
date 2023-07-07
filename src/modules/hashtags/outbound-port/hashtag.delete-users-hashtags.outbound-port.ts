export type HashtagDeleteUsersHashtagsOutboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagDeleteUsersHashtagsOutboundPortOutputDto = {
  hashtagId: string;
};

export const HASHTAG_DELETE_USERS_HASHTAGS_OUTBOUND_PORT =
  'HASHTAG_DELETE_USERS_HASHTAGS_OUTBOUND_PORT' as const;

export interface HashtagDeleteUsersHashtagsOutboundPort {
  execute(
    params: HashtagDeleteUsersHashtagsOutboundPortInputDto,
  ): Promise<HashtagDeleteUsersHashtagsOutboundPortOutputDto>;
}
