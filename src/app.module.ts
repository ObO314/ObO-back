import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { Users } from './database/entities/Users';
import { Todos } from './database/entities/Todos';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    AuthModule,
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
