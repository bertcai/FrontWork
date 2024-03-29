import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static/' });
  await app.listen(3000);

  // 3s 后关闭服务
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
