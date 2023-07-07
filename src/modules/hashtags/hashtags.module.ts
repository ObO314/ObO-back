import { Module } from '@nestjs/common';
import { HashtagsController } from './controller/hashtags.controller';
import { HASHTAG_CREATE_USERS_HASHTAGS_INBOUND_PORT } from './inbound-port/hashtag.users-hashtags-create.inbound-port';
import { HASHTAG_DELETE_USERS_HASHTAGS_INBOUND_PORT } from './inbound-port/hashtag.users-hashtags-delete.inbound-port';
import { HASHTAG_READ_USERS_HASHTAGS_INBOUND_PORT } from './inbound-port/hashtag.users-hashtags-read.inbound-port';
import { HASHTAG_CREATE_USERS_HASHTAGS_OUTBOUND_PORT } from './outbound-port/hashtag.create-users-hashtags.outbound-port';
import { HASHTAG_CREATE_OUTBOUND_PORT } from './outbound-port/hashtag.create.outbound-port';
import { HASHTAG_DELETE_USERS_HASHTAGS_OUTBOUND_PORT } from './outbound-port/hashtag.delete-users-hashtags.outbound-port';
import { HASHTAG_READ_USERS_HASHTAGS_OUTBOUND_PORT } from './outbound-port/hashtag.read-users-hashtags.outbound-port';
import { HASHTAG_READ_OUTBOUND_PORT } from './outbound-port/hashtag.read.outbound-port';
import { HASHTAG_UPDATE_OUTBOUND_PORT } from './outbound-port/hashtag.update.outbound-port';
import { HashtagsUserCreateService } from './service/hashtag.users-hashtags-create.service';
import { HashtagsUserDeleteSerivce } from './service/hashtag.users-hashtags-delete.service';
import { HashtagsUserReadService } from './service/hashtag.users-hashtags-read.service';
import { HashtagCreateUsersHashtagsRepository } from './outbound-adapter/hashtag.create-users-hashtags.repository';
import { HashtagCreateRepository } from './outbound-adapter/hashtag.create.repository';
import { HashtagDeleteUsersHashtagsRepository } from './outbound-adapter/hashtag.delete-users-hashtags.repository';
import { HashtagReadUsersHashtagsRepository } from './outbound-adapter/hashtag.read-users-hashtags.repository';
import { HashtagReadRepository } from './outbound-adapter/hashtag.read.repository';
import { HashtagUpdateRepository } from './outbound-adapter/hashtag.update.repository';

@Module({
  imports: [],
  controllers: [HashtagsController],
  providers: [
    // --- inbound ---
    {
      provide: HASHTAG_CREATE_USERS_HASHTAGS_INBOUND_PORT,
      useClass: HashtagsUserCreateService,
    },
    {
      provide: HASHTAG_DELETE_USERS_HASHTAGS_INBOUND_PORT,
      useClass: HashtagsUserDeleteSerivce,
    },
    {
      provide: HASHTAG_READ_USERS_HASHTAGS_INBOUND_PORT,
      useClass: HashtagsUserReadService,
    },

    // --- outbound ---
    {
      provide: HASHTAG_CREATE_USERS_HASHTAGS_OUTBOUND_PORT,
      useClass: HashtagCreateUsersHashtagsRepository,
    },
    {
      provide: HASHTAG_CREATE_OUTBOUND_PORT,
      useClass: HashtagCreateRepository,
    },
    {
      provide: HASHTAG_DELETE_USERS_HASHTAGS_OUTBOUND_PORT,
      useClass: HashtagDeleteUsersHashtagsRepository,
    },
    {
      provide: HASHTAG_READ_USERS_HASHTAGS_OUTBOUND_PORT,
      useClass: HashtagReadUsersHashtagsRepository,
    },
    {
      provide: HASHTAG_READ_OUTBOUND_PORT,
      useClass: HashtagReadRepository,
    },
    {
      provide: HASHTAG_UPDATE_OUTBOUND_PORT,
      useClass: HashtagUpdateRepository,
    },
  ],
})
export class HashtagsModule {}
