import { Module } from '@nestjs/common';
import { ROUTINE_CREATE_INBOUND_PORT } from './inbound-port/routine.create.inbound-port';
import { ROUTINE_CREATE_OUTBOUND_PORT } from './outbound-port/routine.create.outbound-port';
import { RoutineCreateService } from './service/routine.create.service';
import { RoutineCreateRepository } from './outbound-adaptor/routine.create.repository';
import { RoutineController } from './controller/routine.controller';
import { ROUTINE_READ_BY_DATE_INBOUND_PORT } from './inbound-port/routine.read-by-date.inbound-port';
import { RoutineReadByDateService } from './service/routine.read-by-date.service';
import { ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT } from './outbound-port/routine.read-record-by-date.outbound-port';
import { ROUTINE_READ_BY_DATE_OUTBOUND_PORT } from './outbound-port/routine.read-by-date.outbound-port';
import { RoutineReadByDateRepository } from './outbound-adaptor/routine.read-by-date.repository';
import { RoutineUpdateService } from './service/routine.update.service';
import { ROUTINE_UPDATE_INBOUND_PORT } from './inbound-port/routine.update.inbound-port';
import { RoutineUpdateRepository } from './outbound-adaptor/routine.update.repository';
import { ROUTINE_UPDATE_OUTBOUND_PORT } from './outbound-port/routine.update.outbound-port';
import { RoutineReadRecordByDateRepository } from './outbound-adaptor/routine.read-record-by-date.repository';
import { ROUTINE_CREATE_HISTORY_OUTBOUND_PORT } from './outbound-port/routine.create-history.outbound-port';
import { RoutineCreateHistoryRepository } from './outbound-adaptor/routine.create-history.repository';
import { ROUTINE_CREATE_RECORD_INBOUND_PORT } from './inbound-port/routine.create-record.inbound-port';
import { RoutineCreateRecordService } from './service/routine.create-record.service';
import { RoutineDeleteRecordService } from './service/routine.delete-record.service';
import { ROUTINE_DELETE_RECORD_INBOUND_PORT } from './inbound-port/routine.delete-record.inbound-port';
import { ROUTINE_DELETE_INBOUND_PORT } from './inbound-port/routine.delete.inbound-port';
import { RoutineDeleteService } from './service/routine.delete.service';
import { ROUTINE_CREATE_RECORD_OUTBOUND_PORT } from './outbound-port/routine.create-record.outbound-port';
import { RoutineCreateRecordRepository } from './outbound-adaptor/routine.create-record.repository';
import { RoutineDeleteRecordRepository } from './outbound-adaptor/routine.delete-record.repository';
import { ROUTINE_DELETE_RECORD_OUTBOUND_PORT } from './outbound-port/routine.delete-record.outbound-port';
import { ROUTINE_READ_HISTORY_OUTBOUND_PORT } from './outbound-port/routine.read-history.outbound-port';
import { RoutineReadHistoryRepository } from './outbound-adaptor/routine.read-history.repository';
import { ROUTINE_READ_OUTBOUND_PORT } from './outbound-port/routine.read.outbound-port';
import { RoutineReadRepository } from './outbound-adaptor/routine.read.repository';

@Module({
  imports: [],
  controllers: [RoutineController],
  providers: [
    //--IN BOUND--
    {
      provide: ROUTINE_CREATE_RECORD_INBOUND_PORT,
      useClass: RoutineCreateRecordService,
    },
    {
      provide: ROUTINE_CREATE_INBOUND_PORT,
      useClass: RoutineCreateService,
    },
    {
      provide: ROUTINE_DELETE_RECORD_INBOUND_PORT,
      useClass: RoutineDeleteRecordService,
    },
    {
      provide: ROUTINE_DELETE_INBOUND_PORT,
      useClass: RoutineDeleteService,
    },
    {
      provide: ROUTINE_READ_BY_DATE_INBOUND_PORT,
      useClass: RoutineReadByDateService,
    },
    {
      provide: ROUTINE_UPDATE_INBOUND_PORT,
      useClass: RoutineUpdateService,
    },

    //--OUT BOUND--
    {
      provide: ROUTINE_CREATE_HISTORY_OUTBOUND_PORT,
      useClass: RoutineCreateHistoryRepository,
    },
    {
      provide: ROUTINE_CREATE_RECORD_OUTBOUND_PORT,
      useClass: RoutineCreateRecordRepository,
    },
    {
      provide: ROUTINE_CREATE_OUTBOUND_PORT,
      useClass: RoutineCreateRepository,
    },
    {
      provide: ROUTINE_DELETE_RECORD_OUTBOUND_PORT,
      useClass: RoutineDeleteRecordRepository,
    },
    {
      provide: ROUTINE_READ_BY_DATE_OUTBOUND_PORT,
      useClass: RoutineReadByDateRepository,
    },
    {
      provide: ROUTINE_READ_HISTORY_OUTBOUND_PORT,
      useClass: RoutineReadHistoryRepository,
    },
    {
      provide: ROUTINE_READ_RECORD_BY_DATE_OUTBOUND_PORT,
      useClass: RoutineReadRecordByDateRepository,
    },
    {
      provide: ROUTINE_READ_OUTBOUND_PORT,
      useClass: RoutineReadRepository,
    },
    {
      provide: ROUTINE_UPDATE_OUTBOUND_PORT,
      useClass: RoutineUpdateRepository,
    },
  ],
})
export class RoutineModule {}
