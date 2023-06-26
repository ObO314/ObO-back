export type ReadmeUpdateOutboundPortInputDto = {
  userId: string;

  title: string;

  content: string;
};

export type ReadmeUpdateOutboundPortOutputDto = {
  title: string;

  content: string;
};

export const README_UPDATE_OUTBOUND_PORT =
  'README_UPDATE_OUTBOUND_PORT' as const;

export interface ReadmeUpdateOutboundPort {
  update(
    params: ReadmeUpdateOutboundPortInputDto,
  ): Promise<ReadmeUpdateOutboundPortOutputDto>;
}
