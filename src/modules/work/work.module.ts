import { Module } from '@nestjs/common';
import { WorkCreateService } from './service/work.create.service';
import { WorkUpdateService } from './service/work.update.service';
import { WorkDeleteService } from './service/work.delete.service';
import { WORK_CREATE_INBOUND_PORT } from './inbound-port/work.create.inbound-port';
import { WORK_DELETE_INBOUND_PORT } from './inbound-port/work.delete.inbound-port';
import { WORK_UPDATE_INBOUND_PORT } from './inbound-port/work.update.inbound-port';
import { WorkController } from './controller/work.controller';
import { WORK_CREATE_OUTBOUND_PORT } from './outbound-port/work.create.outbound-port';
import { WORK_DELETE_OUTBOUND_PORT } from './outbound-port/work.delete.outbound-port';
import { WORK_READ_OUTBOUND_PORT } from './outbound-port/work.read.outbound-port';
import { WORK_UPDATE_OUTBOUND_PORT } from './outbound-port/work.update.outbound-port';
import { WORK_FIND_MEMBER_OUTBOUND_PORT } from './outbound-port/work.find-member.outbound-port';
import { WorkCreateRepository } from './outbound-adapter/work.create.repository';
import { WorkDeleteRepository } from './outbound-adapter/work.delete.repository';
import { WorkUpdateRepository } from './outbound-adapter/work.update.repository';
import { WorkReadRepository } from './outbound-adapter/work.read.repository';
import { WorkFindMemberRepository } from './outbound-adapter/work.find-member.repository';
import { WORK_READ_BY_DATE_OUTBOUND_PORT } from './outbound-port/work.read-by-date.outbound-port';
import { WorkReadByDateRepository } from './outbound-adapter/work.read-by-date.repository';
import { WORK_READ_INBOUND_PORT } from './inbound-port/work.read.inbound-port';
import { WorkReadService } from './service/work.read.service';
import { WORK_CREATE_RECORD_INBOUND_PORT } from './inbound-port/work.create-record.inbound-port';
import { WorkCreateRecordService } from './service/work.create-record.service';
import { WORK_DELETE_RECORD_INBOUND_PORT } from './inbound-port/work.delete-record.inbound-port';
import { WorkDeleteRecordService } from './service/work.delete-record.service';
import { WORK_READ_BY_DATE_INBOUND_PORT } from './inbound-port/work.read-by-date.inbound-port';
import { WorkReadByDateService } from './service/work.read-by-date.service';
import { WORK_CREATE_RECORD_OUTBOUND_PORT } from './outbound-port/work.create-record.outbound-port';
import { WorkCreateRecordRepository } from './outbound-adapter/work.create-record.repository';
import { WORK_DELETE_RECORD_OUTBOUND_PORT } from './outbound-port/work.delete-record.outbound-port';
import { WorkDeleteRecordRepository } from './outbound-adapter/work.delete-record.repository';
import { WORK_READ_CIRCLE_OUTBOUND_PORT } from './outbound-port/work.read-circle.outbound-port';
import { WorkReadCircleRepository } from './outbound-adapter/work.read-circle.repository';
import { WORK_READ_RECORD_OUTBOUND_PORT } from './outbound-port/work.read-record.outbound-port';
import { WorkReadRecordRepository } from './outbound-adapter/work.read-record.repository';
import { WORK_READ_RECORDS_OUTBOUND_PORT } from './outbound-port/work.read-records.outbound-port';
import { WorkReadRecordsRepository } from './outbound-adapter/work.read-records.repository';

@Module({
  imports: [],
  controllers: [WorkController],
  providers: [
    //--- inbound ---
    {
      provide: WORK_CREATE_RECORD_INBOUND_PORT,
      useClass: WorkCreateRecordService,
    },
    {
      provide: WORK_CREATE_INBOUND_PORT,
      useClass: WorkCreateService,
    },
    {
      provide: WORK_DELETE_RECORD_INBOUND_PORT,
      useClass: WorkDeleteRecordService,
    },
    {
      provide: WORK_DELETE_INBOUND_PORT,
      useClass: WorkDeleteService,
    },
    {
      provide: WORK_READ_BY_DATE_INBOUND_PORT,
      useClass: WorkReadByDateService,
    },
    {
      provide: WORK_READ_INBOUND_PORT,
      useClass: WorkReadService,
    },
    {
      provide: WORK_UPDATE_INBOUND_PORT,
      useClass: WorkUpdateService,
    },

    //--- outbound ---

    {
      provide: WORK_CREATE_RECORD_OUTBOUND_PORT,
      useClass: WorkCreateRecordRepository,
    },
    {
      provide: WORK_CREATE_OUTBOUND_PORT,
      useClass: WorkCreateRepository,
    },
    {
      provide: WORK_DELETE_RECORD_OUTBOUND_PORT,
      useClass: WorkDeleteRecordRepository,
    },
    {
      provide: WORK_DELETE_OUTBOUND_PORT,
      useClass: WorkDeleteRepository,
    },
    {
      provide: WORK_FIND_MEMBER_OUTBOUND_PORT,
      useClass: WorkFindMemberRepository,
    },
    {
      provide: WORK_READ_BY_DATE_OUTBOUND_PORT,
      useClass: WorkReadByDateRepository,
    },
    {
      provide: WORK_READ_CIRCLE_OUTBOUND_PORT,
      useClass: WorkReadCircleRepository,
    },
    {
      provide: WORK_READ_RECORD_OUTBOUND_PORT,
      useClass: WorkReadRecordRepository,
    },
    {
      provide: WORK_READ_RECORDS_OUTBOUND_PORT,
      useClass: WorkReadRecordsRepository,
    },
    {
      provide: WORK_READ_OUTBOUND_PORT,
      useClass: WorkReadRepository,
    },
    {
      provide: WORK_UPDATE_OUTBOUND_PORT,
      useClass: WorkUpdateRepository,
    },
  ],
})
export class WorkModule {}
