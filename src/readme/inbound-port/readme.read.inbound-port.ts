export type ReadmeReadInboundPortInputDto = {
  userId: string;
};

export type ReadmeReadInboundPortOutputDto = {
  title: string;
  content: string;
};

export const README_READ_INBOUND_PORT = 'README_READ_INBOUND_PORT' as const;

export interface ReadmeReadInboundPort {
  read(
    params: ReadmeReadInboundPortInputDto,
  ): Promise<ReadmeReadInboundPortOutputDto>;
}
