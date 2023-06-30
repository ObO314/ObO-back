import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TodoModule } from '../todo/todo.module';
import { RoutineModule } from '../routine/routine.module';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { ReadmeModule } from '../readme/readme.module';
import { CircleManagementModule } from '../circle/management/circle.management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    AuthModule,
    UserModule,
    TodoModule,
    RoutineModule,
    HashtagsModule,
    ReadmeModule,
    CircleManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
