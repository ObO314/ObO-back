export type ReadmeReadOutboundPortInputDto = {
  userId: string;
};

export type ReadmeReadOutboundPortOutputDto = {
  title: string;
  content: string;
};

export const README_READ_OUTBOUND_PORT = 'README_READ_OUTBOUND_PORT' as const;

export interface ReadmeReadOutboundPort {
  execute(
    params: ReadmeReadOutboundPortInputDto,
  ): Promise<ReadmeReadOutboundPortOutputDto>;
}
