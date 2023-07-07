import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Readme } from 'src/database/entities/Readme';
import {
  ReadmeUpdateOutboundPort,
  ReadmeUpdateOutboundPortInputDto,
  ReadmeUpdateOutboundPortOutputDto,
} from '../outbound-port/readme.update.outbound-port';

@Injectable()
export class ReadmeUpdateRepository implements ReadmeUpdateOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: ReadmeUpdateOutboundPortInputDto,
  ): Promise<ReadmeUpdateOutboundPortOutputDto> {
    const updatedReadme = await this.em.upsert(Readme, {
      user: params.userId,
      title: params.title,
      content: params.content,
    });
    await this.em.flush();
    return updatedReadme;
  }
}
