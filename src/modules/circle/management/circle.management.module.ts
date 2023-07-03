import { Module } from '@nestjs/common';
import { CircleManagementCreateService } from './service/circle.management.create.service';
import { CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT } from './inbound-port/circle.management.create.inbound-port';
import { CircleManagementController } from './controller/circle.management.controller';
import { CircleManagementDeleteService } from './service/circle.management.delete.service';
import { CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT } from './inbound-port/circle.management.delete.inbound-port';
import { CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT } from './outbound-port/circle.management.create.outbound-port';
import { CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT } from './outbound-port/circle.management.read.outbound-port';
import { CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT } from './outbound-port/circle.management.delete.outbound-port';
import { CircleManagementCreateRepository } from './outbound-adapter/circle.management.create.repository';
import { CircleManagementReadRepository } from './outbound-adapter/circle.management.read.repository';
import { CircleManagementDeleteRepository } from './outbound-adapter/circle.management.delete.repository';
import { CIRCLE_MANAGEMENT_READ_BY_NAME_INBOUND_PORT } from './inbound-port/circle.management.read-by-name.inbound-port';
import { CircleManagementReadBynameService } from './service/circle.management.read-by-name.service';
import { CIRCLE_MANAGEMENT_READ_INBOUND_PORT } from './inbound-port/circle.management.read.inbound-port';
import { CircleManagementReadService } from './service/circle.management.read.service';
import { CIRCLE_MANAGEMENT_UPDATE_INBOUND_PORT } from './inbound-port/circle.management.update.inbound-port';
import { CircleManagementUpdateService } from './service/circle.management.update.service';
import { CircleManagementReadByNameRepository } from './outbound-adapter/circle.management.read-by-name.repository';
import { CircleManagementUpdateRepository } from './outbound-adapter/circle.management.update.repository';
import { CIRCLE_MANAGEMENT_READ_BY_NAME_OUTBOUND_PORT } from './outbound-port/circle.management.read-by-name.outbound-port';
import { CIRCLE_MANAGEMENT_UPDATE_OUTBOUND_PORT } from './outbound-port/circle.management.update.outbound-port';
import { CircleManagementCreateMemberRepository } from './outbound-adapter/circle.management.create-member.repository';
import { CIRCLE_MANAGEMENT_CREATE_MEMBER_OUTBOUND_PORT } from './outbound-port/circle.management.create-member.outbound-port';

@Module({
  imports: [],
  controllers: [CircleManagementController],
  providers: [
    //--- inbound ---

    {
      provide: CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT,
      useClass: CircleManagementCreateService,
    },
    {
      provide: CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT,
      useClass: CircleManagementDeleteService,
    },
    {
      provide: CIRCLE_MANAGEMENT_READ_BY_NAME_INBOUND_PORT,
      useClass: CircleManagementReadBynameService,
    },
    {
      provide: CIRCLE_MANAGEMENT_READ_INBOUND_PORT,
      useClass: CircleManagementReadService,
    },
    {
      provide: CIRCLE_MANAGEMENT_UPDATE_INBOUND_PORT,
      useClass: CircleManagementUpdateService,
    },

    //--- outbound ---

    {
      provide: CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT,
      useClass: CircleManagementCreateRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT,
      useClass: CircleManagementReadRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT,
      useClass: CircleManagementDeleteRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_READ_BY_NAME_OUTBOUND_PORT,
      useClass: CircleManagementReadByNameRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_UPDATE_OUTBOUND_PORT,
      useClass: CircleManagementUpdateRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_CREATE_MEMBER_OUTBOUND_PORT,
      useClass: CircleManagementCreateMemberRepository,
    },
  ],
})
export class CircleManagementModule {}
