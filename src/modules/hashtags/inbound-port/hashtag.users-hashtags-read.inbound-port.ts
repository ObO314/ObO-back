import { Hashtags } from 'src/database/entities/Hashtags';

export type HashtagReadUsersHashtagsInboundPortInputDto = {
  userId: string;
};

export type HashtagReadUsersHashtagsInboundPortOutputDto = Hashtags[];

export const HASHTAG_READ_USERS_HASHTAGS_INBOUND_PORT =
  'HASHTAG_READ_USERS_HASHTAGS_INBOUND_PORT ' as const;

export interface HashtagReadUsersHashtagsInboundPort {
  execute(
    params: HashtagReadUsersHashtagsInboundPortInputDto,
  ): Promise<HashtagReadUsersHashtagsInboundPortOutputDto>;
}
