import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

const app = express();

async function bootstrap() {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));

    // Habilitar CORS apenas em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
        nestApp.enableCors({
            origin: 'http://localhost:4200', // Permite apenas o frontend Angular local
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
            credentials: true, // Permite cookies/sessões, se necessário
        });
    } else {
        nestApp.enableCors({
            origin: process.env.FRONTEND_URL || 'https://projeto-rt.netlify.app', // URL de produção
        });
    }

    nestApp.setGlobalPrefix('api');
    await nestApp.init();

    const port = process.env.PORT || 3001;
    if (process.env.NODE_ENV !== 'production') {
        await nestApp.listen(port);
        console.log(`Listening on http://localhost:${port}`);
    }
}
bootstrap();

export const handler = serverless(app);