import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/knex';
import { Readme } from 'src/database/entities/Readme';
import {
  ReadmeDeleteOutboundPort,
  ReadmeDeleteOutboundPortInputDto,
  ReadmeDeleteOutboundPortOutputDto,
} from '../outbound-port/readme.delete.outbound-port';

@Injectable()
export class ReadmeDeleteRepository implements ReadmeDeleteOutboundPort {
  constructor(private readonly em: EntityManager) {}

  async execute(
    params: ReadmeDeleteOutboundPortInputDto,
  ): Promise<ReadmeDeleteOutboundPortOutputDto> {
    const toDeleteReadme = await this.em.findOne(Readme, {
      user: params.userId,
    });
    await this.em.removeAndFlush(toDeleteReadme);
    return toDeleteReadme;
  }
}
