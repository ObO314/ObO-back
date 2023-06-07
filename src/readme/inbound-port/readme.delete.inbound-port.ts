export type ReadmeDeleteInboundPortInputDto = {
  userId: string;
};

export type ReadmeDeleteInboundPortOutputDto = {
  title: string;

  content: string;
};

export const README_DELETE_INBOUND_PORT = 'README_DELETE_INBOUND_PORT' as const;

export interface ReadmeDeleteInboundPort {
  delete(
    params: ReadmeDeleteInboundPortInputDto,
  ): Promise<ReadmeDeleteInboundPortOutputDto>;
}
