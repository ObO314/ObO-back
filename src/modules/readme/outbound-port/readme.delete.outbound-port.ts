import { Readme } from 'src/database/entities/Readme';

export type ReadmeDeleteOutboundPortInputDto = {
  userId: string;
};

export type ReadmeDeleteOutboundPortOutputDto = Readme;

export const README_DELETE_OUTBOUND_PORT =
  'README_DELETE_OUTBOUND_PORT' as const;

export interface ReadmeDeleteOutboundPort {
  execute(
    params: ReadmeDeleteOutboundPortInputDto,
  ): Promise<ReadmeDeleteOutboundPortOutputDto>;
}
