export type ReadmeUpdateInboundPortInputDto = {
  userId: string;

  title: string;

  content: string;
};

export type ReadmeUpdateInboundPortOutputDto = {
  title: string;

  content: string;
};

export const README_UPDATE_INBOUND_PORT = 'README_UPDATE_INBOUND_PORT' as const;

export interface ReadmeUpdateInboundPort {
  update(
    params: ReadmeUpdateInboundPortInputDto,
  ): Promise<ReadmeUpdateInboundPortOutputDto>;
}
