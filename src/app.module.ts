import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [SignUpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
