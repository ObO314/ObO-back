import { Readme } from 'src/database/entities/Readme';

export type ReadmeUpdateOutboundPortInputDto = {
  userId: string;
  title: string;
  content: string;
};

export type ReadmeUpdateOutboundPortOutputDto = Readme;

export const README_UPDATE_OUTBOUND_PORT =
  'README_UPDATE_OUTBOUND_PORT' as const;

export interface ReadmeUpdateOutboundPort {
  execute(
    params: ReadmeUpdateOutboundPortInputDto,
  ): Promise<ReadmeUpdateOutboundPortOutputDto>;
}
