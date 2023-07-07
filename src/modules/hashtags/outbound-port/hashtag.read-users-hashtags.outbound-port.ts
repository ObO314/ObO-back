import { Hashtags } from 'src/database/entities/Hashtags';

export type HashtagReadUsersHashtagsOutboundPortInputDto = {
  userId: string;
};

export type HashtagReadUsersHashtagsOutboundPortOutputDto = Array<Hashtags>;

export const HASHTAG_READ_USERS_HASHTAGS_OUTBOUND_PORT =
  'HASHTAG_READ_USERS_HASHTAGS_OUTBOUND_PORT' as const;

export interface HashtagReadUsersHashtagsOutboundPort {
  execute(
    params: HashtagReadUsersHashtagsOutboundPortInputDto,
  ): Promise<HashtagReadUsersHashtagsOutboundPortOutputDto>;
}
