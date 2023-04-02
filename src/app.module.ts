import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    //...Repositories,
    MikroOrmModule.forRoot(),
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 엔티티 작성
// 레포지토리 작성해서 엔티티 임포트
// 엔티티 post 하는 로직 해서 테스트
