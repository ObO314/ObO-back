import { Module } from '@nestjs/common';
import { ROUTINE_CREATE_INBOUND_PORT } from './inbound-port/routine.create.inbound-port';
import { ROUTINE_CREATE_OUTBOUND_PORT } from './outbound-port/routine.create.outbound-port';
import { RoutineCreateService } from './service/routine.create.service';
import { RoutineCreateRepository } from './outbound-adaptor/routine.create.repository';
import { RoutineController } from './controller/routine.controller';
import { ROUTINE_READ_BY_DATE_INBOUND_PORT } from './inbound-port/routine.read-by-date.inbound-port';
import { ROUTINE_READ_BY_DATE_OUTBOUND_PORT } from './outbound-port/routine.read-by-date.outbound-port';
import { RoutineReadByDateService } from './service/routine.read-by-date.service';
import { RoutineReadByDateRepository } from './outbound-adaptor/routine.read-by-date.repository';
import { ROUTINE_UPDATE_BY_ID_OUTBOUND_PORT } from './outbound-port/routine.update-by-id.outbound-port';
import { ROUTINE_UPDATE_BY_ID_INBOUND_PORT } from './inbound-port/routine.update-by-id.inbound-port';
import { RoutineUpdateByIdService } from './service/routine.update-by-id.service';
import { RoutineUpdateByIdRepository } from './outbound-adaptor/routine.update-by-id.repository';

@Module({
  imports: [],
  controllers: [RoutineController],
  providers: [
    {
      provide: ROUTINE_CREATE_INBOUND_PORT,
      useClass: RoutineCreateService,
    },
    {
      provide: ROUTINE_CREATE_OUTBOUND_PORT,
      useClass: RoutineCreateRepository,
    },
    {
      provide: ROUTINE_READ_BY_DATE_INBOUND_PORT,
      useClass: RoutineReadByDateService,
    },
    {
      provide: ROUTINE_READ_BY_DATE_OUTBOUND_PORT,
      useClass: RoutineReadByDateRepository,
    },
    {
      provide: ROUTINE_UPDATE_BY_ID_INBOUND_PORT,
      useClass: RoutineUpdateByIdService,
    },
    {
      provide: ROUTINE_UPDATE_BY_ID_OUTBOUND_PORT,
      useClass: RoutineUpdateByIdRepository,
    },
  ],
})
export class RoutineModule {}
