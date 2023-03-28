import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from 'src/database/entities/Users';

@Module({
  imports: [MikroOrmModule.forFeature([Users])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class DataBaseModule {}
