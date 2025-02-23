import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import {
  BadRequestExceptionFilter,
  CatchAllExceptionFilter,
  CoreModule,
  ForbiddenEditExceptionFilter,
  LoggerService,
  NotFoundExceptionFilter,
  QueryFailedExceptionFilter,
} from './core'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreModule, {
    forceCloseConnections: true,
    logger: new LoggerService(),
  })

  app.useGlobalFilters(
    new CatchAllExceptionFilter(app.get(HttpAdapterHost).httpAdapter),
    new ForbiddenEditExceptionFilter(),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new QueryFailedExceptionFilter(),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
    }),
  )

  SwaggerModule.setup('docs', app, () =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Devices API')
        .setDescription(
          'REST API capable of persisting and managing device resources',
        )
        .setVersion('0.0.1')
        .setContact(
          'Nelson Antunes',
          'https://neryuuk.com/',
          'neryuuk@neryuuk.com',
        )
        .build(),
    ),
  )

  await app.listen(process.env.PORT ?? 3000)
}

// eslint-disable-next-line
bootstrap()
