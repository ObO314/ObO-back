export type ReadmeDeleteOutboundPortInputDto = {
  userId: string;
};

export type ReadmeDeleteOutboundPortOutputDto = {
  title: string;
  content: string;
};

export const README_DELETE_OUTBOUND_PORT =
  'README_DELETE_OUTBOUND_PORT' as const;

export interface ReadmeDeleteOutboundPort {
  delete(
    params: ReadmeDeleteOutboundPortInputDto,
  ): Promise<ReadmeDeleteOutboundPortOutputDto>;
}
