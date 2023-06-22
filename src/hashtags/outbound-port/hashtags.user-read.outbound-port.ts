import { Hashtags } from 'src/database/entities/Hashtags';

export type HashtagsUserReadOutboundPortInputDto = {
  userId: string;
};

export type HashtagsUserReadOutboundPortOutputDto = Hashtags[];

export const HASHTAGS_USER_READ_OUTBOUND_PORT =
  'HASHTAGS_USER_READ_OUTBOUND_PORT' as const;

export interface HashtagsUserReadOutboundPort {
  read(
    params: HashtagsUserReadOutboundPortInputDto,
  ): Promise<HashtagsUserReadOutboundPortOutputDto>;
}
