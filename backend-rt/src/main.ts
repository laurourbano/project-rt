import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

const app = express();

async function bootstrap() {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
    nestApp.setGlobalPrefix('api');
    await nestApp.init();
}
bootstrap();

export const handler = serverless(app);