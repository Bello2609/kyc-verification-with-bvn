import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle("BVN API")
  .setDescription("this api is to fetch data from dojah")
  .setVersion("1.0")
  .addTag("bvn")
  .addApiKey(
    { type: 'apiKey', name: 'x-api-key', in: 'header' }, 
    'x-api-key', // Security name for x-api-key
  )
  .addApiKey(
    { type: 'apiKey', name: 'AppId', in: 'header' }, 
    'AppId', // Security name for AppId
  )
  .build();
  const documentFactory = ()=> SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory)
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
