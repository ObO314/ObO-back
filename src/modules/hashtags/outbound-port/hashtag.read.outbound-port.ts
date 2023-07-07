import { Hashtags } from 'src/database/entities/Hashtags';

export type HashtagReadOutboundPortInputDto = {
  hashtag: string;
};

export type HashtagReadOutboundPortOutputDto = Hashtags;

export const HASHTAG_READ_OUTBOUND_PORT = 'HASHTAG_READ_OUTBOUND_PORT' as const;

export interface HashtagReadOutboundPort {
  execute(
    params: HashtagReadOutboundPortInputDto,
  ): Promise<HashtagReadOutboundPortOutputDto>;
}
