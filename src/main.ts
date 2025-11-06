import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar motor de plantillas Handlebars
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Configurar partials y layouts
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  // Configurar el motor express-handlebars con layout predeterminado
  const express = require('express');
  const exphbs = require('express-handlebars');

  const hbsEngine = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
    helpers: {
      eq: (a, b) => a === b
    }
  });

  app.engine('hbs', hbsEngine.engine);

  // Servir archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
