import { PassportModule } from '@nestjs/passport';
import { ReadmeController } from './controller/readme.controller';
import { Module } from '@nestjs/common';
import { README_READ_INBOUND_PORT } from './inbound-port/readme.read.inbound-port';
import { README_READ_OUTBOUND_PORT } from './outbound-port/readme.read.outbound-port';
import { ReadmeReadService } from './service/readme.read.service';
import { README_UPDATE_INBOUND_PORT } from './inbound-port/readme.update.inbound-port';
import { README_UPDATE_OUTBOUND_PORT } from './outbound-port/readme.update.outbound-port';
import { ReadmeUpdateService } from './service/readme.update.service';
import { README_DELETE_INBOUND_PORT } from './inbound-port/readme.delete.inbound-port';
import { README_DELETE_OUTBOUND_PORT } from './outbound-port/readme.delete.outbound-port';
import { ReadmeDeleteService } from './service/readme.delete.service';
import { ReadmeReadRepository } from './outbound-adapter/readme.read.repository';
import { ReadmeUpdateRepository } from './outbound-adapter/readme.update.repository';
import { ReadmeDeleteRepository } from './outbound-adapter/readme.delete.repository';

@Module({
  imports: [],
  controllers: [ReadmeController],
  providers: [
    {
      provide: README_READ_INBOUND_PORT,
      useClass: ReadmeReadService,
    },
    {
      provide: README_UPDATE_INBOUND_PORT,
      useClass: ReadmeUpdateService,
    },
    {
      provide: README_DELETE_INBOUND_PORT,
      useClass: ReadmeDeleteService,
    },

    {
      provide: README_READ_OUTBOUND_PORT,
      useClass: ReadmeReadRepository,
    },
    {
      provide: README_UPDATE_OUTBOUND_PORT,
      useClass: ReadmeUpdateRepository,
    },
    {
      provide: README_DELETE_OUTBOUND_PORT,
      useClass: ReadmeDeleteRepository,
    },
  ],
})
export class ReadmeModule {}
