import { Hashtags } from 'src/database/entities/Hashtags';

export type HashtagsUserReadInboundPortInputDto = {
  userId: string;
};

export type HashtagsUserReadInboundPortOutputDto = Hashtags[];

export const HASHTAGS_USER_READ_INBOUND_PORT =
  'HASHTAGS_USER_READ_INBOUND_PORT ' as const;

export interface HashtagsUserReadInboundPort {
  read(
    params: HashtagsUserReadInboundPortInputDto,
  ): Promise<HashtagsUserReadInboundPortOutputDto>;
}
