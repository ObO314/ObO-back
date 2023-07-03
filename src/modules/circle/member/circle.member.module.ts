import { Module } from '@nestjs/common';
import { CIRCLE_MEMBER_APPLY_INBOUND_PORT } from './inbound-port/circle.member.apply.inbound-port';
import { CIRCLE_MEMBER_FIND_OUTBOUND_PORT } from './outbound-port/circle.member.find.outbound-port';
import { CIRCLE_MEMBER_READ_CIRCLE_OUTBOUND_PORT } from './outbound-port/circle.member.read-circle.outbound-port';
import { CIRCLE_MEMBER_APPLY_OUTBOUND_PORT } from './outbound-port/circle.member.apply.outbound-port';
import { CircleMemberController } from './controller/circle.member.controller';
import { CircleMemberApplyService } from './service/circle.member.apply.service';
import { CircleMemberFindRepository } from './outbound-adapter/circle.member.find.repository';
import { CircleMemberReadCircleRepository } from './outbound-adapter/circle.member.read-circle.repository';
import { CircleMemberApplyRepository } from './outbound-adapter/circle.member.apply.repository';
import { CIRCLE_MEMBER_READ_APPLICATIONS_INBOUND_PORT } from './inbound-port/circle.member.read-applications.inbound-port';
import { CircleMemberReadApplicationsService } from './service/circle.member.read-applications.service';
import { CIRCLE_MEMBER_READ_APPLICATIONS_OUTBOUND_PORT } from './outbound-port/circle.member.read-applications.outbound-port';
import { CircleMemberReadApplicationsRepository } from './outbound-adapter/circle.member.read-applications.repository';
import { CIRCLE_MEMBER_APPROVE_INBOUND_PORT } from './inbound-port/circle.member.approve.inbound-port';
import { CircleMemberApproveService } from './service/circle.member.approve.service';
import { CIRCLE_MEMBER_READ_INBOUND_PORT } from './inbound-port/circle.member.read.inbound-port';
import { CircleMemberReadService } from './service/circle.member.read.service';
import { CIRCLE_MEMBER_CREATE_OUTBOUND_PORT } from './outbound-port/circle.member.create.outbound-port';
import { CircleMemberCreateRepository } from './outbound-adapter/circle.member.create.repository';
import { CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT } from './outbound-port/circle.member.delete-application.outbound-port';
import { CircleMemberDeleteApplicationRespository } from './outbound-adapter/circle.member.delete-application.repository';
import { CIRCLE_MEMBER_READ_OUTBOUND_PORT } from './outbound-port/circle.member.read.outbound-port';
import { CircleMemberReadRepository } from './outbound-adapter/circle.member.read.repository';
import { CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT } from './outbound-port/circle.member.update-circle.outbound-port';
import { CircleMemberUpdateCircleRepository } from './outbound-adapter/circle.member.update-circle.repository';

@Module({
  imports: [],
  controllers: [CircleMemberController],
  providers: [
    //--- inbound ---

    {
      provide: CIRCLE_MEMBER_APPLY_INBOUND_PORT,
      useClass: CircleMemberApplyService,
    },
    {
      provide: CIRCLE_MEMBER_READ_APPLICATIONS_INBOUND_PORT,
      useClass: CircleMemberReadApplicationsService,
    },
    {
      provide: CIRCLE_MEMBER_APPROVE_INBOUND_PORT,
      useClass: CircleMemberApproveService,
    },
    {
      provide: CIRCLE_MEMBER_READ_INBOUND_PORT,
      useClass: CircleMemberReadService,
    },

    //--- outbound ---

    {
      provide: CIRCLE_MEMBER_APPLY_OUTBOUND_PORT,
      useClass: CircleMemberApplyRepository,
    },
    {
      provide: CIRCLE_MEMBER_CREATE_OUTBOUND_PORT,
      useClass: CircleMemberCreateRepository,
    },
    {
      provide: CIRCLE_MEMBER_DELETE_APPLICATION_OUTBOUND_PORT,
      useClass: CircleMemberDeleteApplicationRespository,
    },
    {
      provide: CIRCLE_MEMBER_FIND_OUTBOUND_PORT,
      useClass: CircleMemberFindRepository,
    },
    {
      provide: CIRCLE_MEMBER_READ_APPLICATIONS_OUTBOUND_PORT,
      useClass: CircleMemberReadApplicationsRepository,
    },
    {
      provide: CIRCLE_MEMBER_READ_CIRCLE_OUTBOUND_PORT,
      useClass: CircleMemberReadCircleRepository,
    },
    {
      provide: CIRCLE_MEMBER_READ_OUTBOUND_PORT,
      useClass: CircleMemberReadRepository,
    },
    {
      provide: CIRCLE_MEMBER_UPDATE_CIRCLE_OUTBOUND_PORT,
      useClass: CircleMemberUpdateCircleRepository,
    },
  ],
})
export class CircleMemberModule {}
