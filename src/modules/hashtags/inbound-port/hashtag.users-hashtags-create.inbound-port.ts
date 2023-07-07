export type HashtagCreateUsersHashtagsInboundPortInputDto = {
  userId: string;
  hashtag: string;
};

export type HashtagCreateUsersHashtagsInboundPortOutputDto = {
  hashtagId: string;
  hashtagName: string;
  mentions: string;
};

export const HASHTAG_CREATE_USERS_HASHTAGS_INBOUND_PORT =
  'HASHTAG_CREATE_USERS_HASHTAGS_INBOUND_PORT' as const;

export interface HashtagCreateUsersHashtagsInboundPort {
  execute(
    params: HashtagCreateUsersHashtagsInboundPortInputDto,
  ): Promise<HashtagCreateUsersHashtagsInboundPortOutputDto>;
}
