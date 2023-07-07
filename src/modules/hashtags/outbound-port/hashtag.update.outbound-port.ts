export type HashtagUpdateOutboundPortInputDto = {
  hashtag: string;
  mentions: string;
};

export type HashtagUpdateOutboundPortOutputDto = {
  hashtagId: string;
  hashtagName: string;
  mentions: string;
};

export const HASHTAG_UPDATE_OUTBOUND_PORT =
  'HASHTAG_UPDATE_OUTBOUND_PORT' as const;

export interface HashtagUpdateOutboundPort {
  execute(
    params: HashtagUpdateOutboundPortInputDto,
  ): Promise<HashtagUpdateOutboundPortOutputDto>;
}
