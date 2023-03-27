import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SignUpService } from './service/sign-up.service';
import { SIGN_UP_OUTBOUND_PORT } from './outbound-port/sign-up.outbound-port';
import { SIGN_UP_INBOUND_PORT } from './inbound-port/sign-up.inbound-port';
import { signUpController } from './controller/sign-up.controller';
import { Module } from '@nestjs/common';
import { SignUpRepository } from './outbound-adaptor/sign-up.repository';
import { DataBaseModule } from 'src/database/database.module';
import { Users } from 'src/database/entities/Users';

@Module({
  imports: [MikroOrmModule.forFeature([Users])],
  controllers: [signUpController],
  providers: [
    {
      provide: SIGN_UP_INBOUND_PORT,
      useClass: SignUpService,
    },
    {
      provide: SIGN_UP_OUTBOUND_PORT,
      useClass: SignUpRepository,
    },
  ],
})
export class SignUpModule {}
