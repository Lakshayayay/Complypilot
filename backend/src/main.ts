import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import multipart from '@fastify/multipart';

async function bootstrap() {
  // Use Fastify as the HTTP provider (techstack.md §3)
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Register multipart to support file uploads (Tally XML, Excel)
  await app.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
    },
  });

  // Global API prefix — all routes are under /api/v1
  app.setGlobalPrefix('api/v1');

  // Global validation pipe:
  // - whitelist: strips unknown properties from DTOs
  // - forbidNonWhitelisted: throws 400 if unknown properties are present
  // - transform: auto-converts plain objects to DTO class instances
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS for the Next.js frontend (localhost:3000 in dev)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  const port = process.env.PORT ?? 3001;
  // Fastify requires '0.0.0.0' to bind to all interfaces (not 'localhost')
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 ComplyPilot API running on http://localhost:${port}/api/v1`);
}

bootstrap();
