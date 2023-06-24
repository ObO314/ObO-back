import { Module } from '@nestjs/common';
import { ROUTINE_CREATE_INBOUND_PORT } from './inbound-port/routine.create.inbound-port';
import { ROUTINE_CREATE_OUTBOUND_PORT } from './outbound-port/routine.create.outbound-port';
import { RoutineCreateService } from './service/routine.create.service';
import { RoutineCreateRepository } from './outbound-adaptor/routine.create.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ROUTINE_CREATE_INBOUND_PORT,
      useClass: RoutineCreateService,
    },
    {
      provide: ROUTINE_CREATE_OUTBOUND_PORT,
      useClass: RoutineCreateRepository,
    },
  ],
})
export class UserModule {}
