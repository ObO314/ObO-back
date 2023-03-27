import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [
    //...Repositories,
    MikroOrmModule.forRoot(),
    SignUpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 엔티티 작성
// 레포지토리 작성해서 엔티티 임포트
// 엔티티 post 하는 로직 해서 테스트
