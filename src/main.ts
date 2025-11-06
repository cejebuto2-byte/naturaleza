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
      // Comparación de igualdad
      eq: (a, b) => a === b,

      // Formatear números con separadores de miles
      formatNumber: (num: number) => {
        return num?.toLocaleString('es-CO') || '0';
      },

      // Formatear moneda colombiana
      formatCurrency: (amount: number) => {
        return `$${amount?.toLocaleString('es-CO') || '0'}`;
      },

      // Formatear fecha
      formatDate: (date: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },

      // Formatear fecha corta
      formatDateShort: (date: string) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('es-CO');
      },

      // Convertir objeto a JSON (útil para pasar datos a JavaScript)
      json: (context: any) => {
        return JSON.stringify(context);
      },

      // Obtener color según tipo de necesidad
      colorNecesidad: (tipo: string) => {
        const colores = {
          agua: 'blue',
          alimentos: 'orange',
          salud: 'red',
          vivienda: 'purple',
          educacion: 'green',
          psicosocial: 'pink'
        };
        return colores[tipo] || 'gray';
      },

      // Obtener badge de prioridad
      badgePrioridad: (nivel: string) => {
        const badges = {
          urgente: 'bg-red-100 text-red-800',
          alta: 'bg-orange-100 text-orange-800',
          media: 'bg-yellow-100 text-yellow-800',
          baja: 'bg-green-100 text-green-800'
        };
        return badges[nivel] || 'bg-gray-100 text-gray-800';
      },

      // Obtener badge de nivel de alerta
      badgeAlerta: (nivel: string) => {
        const badges = {
          'Rojo': 'bg-red-600 text-white',
          'Naranja': 'bg-orange-500 text-white',
          'Amarillo': 'bg-yellow-400 text-gray-900',
          'Verde': 'bg-green-600 text-white'
        };
        return badges[nivel] || 'bg-gray-600 text-white';
      },

      // Obtener el valor máximo de un objeto
      max: (obj: Record<string, number>) => {
        if (!obj || typeof obj !== 'object') return 0;
        return Math.max(...Object.values(obj));
      },
    }
  });

  app.engine('hbs', hbsEngine.engine);

  // Servir archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
