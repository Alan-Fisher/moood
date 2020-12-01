import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configService } from './config/config.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(null, true)
        // callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'Content-Type, Authorization, Accept, Observe, Postman-Token',
    methods: "GET,PATCH,POST,DELETE,UPDATE,OPTIONS",
  })

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Item API')
      .setDescription('My Item API')
      .build())

    SwaggerModule.setup('docs', app, document)

  }

  await app.listen(3003)
}

bootstrap()
