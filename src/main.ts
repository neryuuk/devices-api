import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import {
  CatchAllExceptionFilter,
  LoggerService,
  NotFoundExceptionFilter,
  QueryFailedExceptionFilter,
} from './core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
    logger: new LoggerService(),
  })

  app.useGlobalFilters(
    new CatchAllExceptionFilter(app.get(HttpAdapterHost).httpAdapter),
    new NotFoundExceptionFilter(),
    new QueryFailedExceptionFilter(),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
    })
  )

  SwaggerModule.setup('docs', app, () =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Devices API')
        .setDescription('REST API capable of persisting and managing device resources')
        .setVersion('0.0.1')
        .setContact('Nelson Antunes', 'https://neryuuk.com/', 'neryuuk@neryuuk.com')
        .build(),
    ),
  )

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
