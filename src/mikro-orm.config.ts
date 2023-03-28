import { Options } from '@mikro-orm/core';
import { Users } from './database/entities/Users';

const config: Options = {
  entities: [Users],
  //autoLoadEntities : true, //이거 키면 entities 에 있는 배열이 비어야 함.
  dbName: 'OBO_DB',
  user: 'postgres',
  password: 'obo314!!',
  type: 'postgresql',
  host: 'obo-postgre-instance-1.cxyyl9dcd6t0.ap-northeast-2.rds.amazonaws.com',
  port: 5432,

  //autoLoadEntities : true, //이거 키면 entities 에 있는 배열이 비어야 함.
  //   dbName: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   type: 'postgresql',
  //   host: process.env.DB_HOST,
  //   port: 5432

  //synchronize : true,
};

export default config;
