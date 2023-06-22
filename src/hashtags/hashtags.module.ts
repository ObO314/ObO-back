import { Module } from '@nestjs/common';
import { HashtagsController } from './controller/hashtags.controller';
import { HASHTAGS_USER_CREATE_INBOUND_PORT } from './inbound-port/hashtags.user-create.inbound-port';
import { HashtagsUserRepository } from './outbound-adapter/hashtags.user.repository';
import { HashtagsUserCreateService } from './service/hashtags.user-create.service';
import { HASHTAGS_USER_CREATE_OUTBOUND_PORT } from './outbound-port/hashtags.user-create.outbound-port';
import { HASHTAGS_USER_READ_INBOUND_PORT } from './inbound-port/hashtags.user-read.inbound-port';
import { HashtagsUserReadService } from './service/hashtags.user-read.service';
import { HASHTAGS_USER_READ_OUTBOUND_PORT } from './outbound-port/hashtags.user-read.outbound-port';
import { HASHTAGS_USER_DELETE_INBOUND_PORT } from './inbound-port/hashtags.user-delete.inbound-port';
import { HashtagsUserDeleteSerivce } from './service/hashtags.user-delete.service';
import { HASHTAGS_USER_DELETE_OUTBOUND_PORT } from './outbound-port/hashtags.user-delete.outbound-port';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [HashtagsController],
  providers: [
    {
      provide: HASHTAGS_USER_CREATE_INBOUND_PORT,
      useClass: HashtagsUserCreateService,
    },
    {
      provide: HASHTAGS_USER_CREATE_OUTBOUND_PORT,
      useClass: HashtagsUserRepository,
    },
    {
      provide: HASHTAGS_USER_READ_INBOUND_PORT,
      useClass: HashtagsUserReadService,
    },
    {
      provide: HASHTAGS_USER_READ_OUTBOUND_PORT,
      useClass: HashtagsUserRepository,
    },
    {
      provide: HASHTAGS_USER_DELETE_INBOUND_PORT,
      useClass: HashtagsUserDeleteSerivce,
    },
    {
      provide: HASHTAGS_USER_DELETE_OUTBOUND_PORT,
      useClass: HashtagsUserRepository,
    },
  ],
})
export class HashtagsModule {}
