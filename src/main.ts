import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: '*',
        credentials: true,
        exposedHeaders: 'set-cookie'
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // Преобразует значения в указанные типы (например, enum)
            whitelist: true, // Удаляет лишние поля из тела запроса
            forbidNonWhitelisted: true, // Выдаёт ошибку, если есть лишние поля
        }),
    );
    await app.listen(443);
}

bootstrap()