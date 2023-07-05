import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

async function bootstrap() {
  const configService = new ConfigService();
  const PORT = configService.get('PORT');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app
    .use(
      session({
        secret: 'masdasdasda',
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true },
      }),
    )
    .listen(PORT, () =>
      console.log(`Server is running on the port ${PORT}...`),
    );
}
bootstrap();
