import { Module } from '@nestjs/common';
import { CircleManagementCreateService } from './service/circle.management.create.service';
import { CIRCLE_MANAGEMENT_CREATE_INBOUND_PORT } from './inbound-port/circle.management.create.inbound-port';
import { CircleManagementController } from './controller/circle.management.controller';
import { CircleManagementDeleteService } from './service/circle.management.delete.service';
import { CIRCLE_MANAGEMENT_DELETE_INBOUND_PORT } from './inbound-port/circle.management.delete.inbound-port';
import { CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT } from './outbound-port/circle.management.create.outbound-port';
import { CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT } from './outbound-port/circle.management.read.outbound-port';
import { CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT } from './outbound-port/circle.management.delete.outbound-port';
import { circleManagementCreateRepository } from './outbound-adapter/circle.management.create.repository';
import { circleManagementReadRepository } from './outbound-adapter/circle.management.read.repository';
import { circleManagementDeleteRepository } from './outbound-adapter/circle.management.delete.repository';

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

    //--- outbound ---

    {
      provide: CIRCLE_MANAGEMENT_CREATE_OUTBOUND_PORT,
      useClass: circleManagementCreateRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_READ_OUTBOUND_PORT,
      useClass: circleManagementReadRepository,
    },
    {
      provide: CIRCLE_MANAGEMENT_DELETE_OUTBOUND_PORT,
      useClass: circleManagementDeleteRepository,
    },
  ],
})
export class CircleManagementModule {}
