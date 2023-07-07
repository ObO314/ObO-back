import { Hashtags } from 'src/database/entities/Hashtags';

export type HashtagCreateOutboundPortInputDto = {
  hashtag: string;
};

export type HashtagCreateOutboundPortOutputDto = Hashtags;

export const HASHTAG_CREATE_OUTBOUND_PORT =
  'HASHTAG_CREATE_OUTBOUND_PORT' as const;

export interface HashtagCreateOutboundPort {
  execute(
    params: HashtagCreateOutboundPortInputDto,
  ): Promise<HashtagCreateOutboundPortOutputDto>;
}
