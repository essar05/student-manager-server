import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.CERT_KEY_FILE),
    cert: fs.readFileSync(process.env.CERT_FILE),
  };
  console.log("JWT", process.env.JWT_KEY)
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
