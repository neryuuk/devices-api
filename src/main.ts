import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('api', app, () => SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Devices API')
      .setDescription('Devices API')
      .setVersion('0.0.1')
      .build()
  ));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
