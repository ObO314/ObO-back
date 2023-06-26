import { testConfig } from 'src/mikro-orm.test.config';
import { NestFactory } from '@nestjs/core';
import { MikroORM } from '@mikro-orm/postgresql';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const orm = await MikroORM.init(testConfig); // MikroORM 설정을 사용하여 초기화합니다.
  const generator = orm.getSchemaGenerator(); // 스키마 생성기를 가져옵니다.
  await generator.updateSchema();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
