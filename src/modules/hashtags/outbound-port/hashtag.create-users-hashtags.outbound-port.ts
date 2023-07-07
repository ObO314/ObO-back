import { UsersHashtags } from 'src/database/entities/usersHashtags';

export type HashtagCreateUsersHashTagsOutboundPortInputDto = {
  userId: string;
  hashtagId: string;
};

export type HashtagCreateUsersHashTagsOutboundPortOutputDto = UsersHashtags;

export const HASHTAG_CREATE_USERS_HASHTAGS_OUTBOUND_PORT =
  'HASHTAG_CREATE_USERS_HASHTAGS_OUTBOUND_PORT' as const;

export interface HashtagCreateUsersHashTagsOutboundPort {
  execute(
    params: HashtagCreateUsersHashTagsOutboundPortInputDto,
  ): Promise<HashtagCreateUsersHashTagsOutboundPortOutputDto>;
}
