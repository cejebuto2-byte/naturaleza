import { Controller, Get, Post, Body, Render, Param, Res, Query, Redirect } from '@nestjs/common';
import { Response } from 'express';
import { AportesService } from './aportes.service';

@Controller('aportes')
export class AportesController {
  constructor(private readonly aportesService: AportesService) {}

  // Vista principal de aportes con listado
  @Get()
  @Render('aportes/index')
  index(@Query('tipo') tipo?: string) {
    let aportes = this.aportesService.getAllAportes();

    // Filtrar por tipo si se proporciona
    if (tipo && (tipo === 'monetario' || tipo === 'especie' || tipo === 'voluntariado')) {
      aportes = this.aportesService.getAportesByTipo(tipo);
    }

    const estadisticas = this.aportesService.getEstadisticas();

    return {
      title: 'Aportes Solidarios',
      active: 'aportes',
      aportes,
      estadisticas,
      filtroTipo: tipo || 'todos',
    };
  }

  // Vista formulario de aporte monetario
  @Get('monetario')
  @Render('aportes/monetario')
  formMonetario() {
    return {
      title: 'Aporte Monetario',
      active: 'aportes',
    };
  }

  // Vista formulario de aporte en especie
  @Get('especie')
  @Render('aportes/especie')
  formEspecie() {
    return {
      title: 'Aporte en Especie',
      active: 'aportes',
    };
  }

  // Vista formulario de voluntariado
  @Get('voluntariado')
  @Render('aportes/voluntariado')
  formVoluntariado() {
    return {
      title: 'Voluntariado',
      active: 'aportes',
    };
  }

  // Crear aporte monetario
  @Post('monetario')
  @Redirect('/aportes?success=monetario')
  createMonetario(@Body() body: any) {
    const data = {
      nombre: body.nombre,
      cargo: body.cargo,
      monto: parseFloat(body.monto),
      periodicidad: body.periodicidad as 'mensual' | 'quincenal',
      fechaInicio: body.fechaInicio,
      activo: true,
    };
    this.aportesService.createAporteMonetario(data);
  }

  // Crear aporte en especie
  @Post('especie')
  @Redirect('/aportes?success=especie')
  createEspecie(@Body() body: any) {
    const data = {
      nombre: body.nombre,
      cargo: body.cargo,
      tipoAyuda: body.tipoAyuda,
      descripcion: body.descripcion,
      fechaEntrega: body.fechaEntrega,
      destino: body.destino,
    };
    this.aportesService.createAporteEspecie(data);
  }

  // Crear voluntariado
  @Post('voluntariado')
  @Redirect('/aportes?success=voluntariado')
  createVoluntariado(@Body() body: any) {
    const data = {
      nombre: body.nombre,
      cargo: body.cargo,
      actividad: body.actividad,
      horas: parseFloat(body.horas),
      fecha: body.fecha,
      lugar: body.lugar,
    };
    this.aportesService.createVoluntariado(data);
  }

  // Generar certificado (simulado)
  @Get('certificado/:id')
  getCertificado(@Param('id') id: string, @Res() res: Response) {
    const aporte = this.aportesService.getAporteById(parseInt(id));

    if (!aporte) {
      return res.status(404).send('Aporte no encontrado');
    }

    // Simulación de PDF - En producción real usaríamos jsPDF
    const certificadoHTML = this.generarCertificadoHTML(aporte);

    res.setHeader('Content-Type', 'text/html');
    res.send(certificadoHTML);
  }

  // API: Obtener todos los aportes
  @Get('api/all')
  getAllAportes() {
    return this.aportesService.getAllAportes();
  }

  // API: Obtener estadísticas
  @Get('api/estadisticas')
  getEstadisticas() {
    return this.aportesService.getEstadisticas();
  }

  // Método privado para generar HTML del certificado
  private generarCertificadoHTML(aporte: any): string {
    const fecha = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let contenidoAporte = '';
    if (aporte.tipoAporte === 'monetario') {
      contenidoAporte = `
        <p><strong>Tipo de Aporte:</strong> Monetario</p>
        <p><strong>Monto:</strong> $${aporte.monto.toLocaleString('es-CO')}</p>
        <p><strong>Periodicidad:</strong> ${aporte.periodicidad}</p>
        <p><strong>Fecha de Inicio:</strong> ${new Date(aporte.fechaInicio).toLocaleDateString('es-CO')}</p>
      `;
    } else if (aporte.tipoAporte === 'especie') {
      contenidoAporte = `
        <p><strong>Tipo de Aporte:</strong> En Especie</p>
        <p><strong>Tipo de Ayuda:</strong> ${aporte.tipoAyuda}</p>
        <p><strong>Descripción:</strong> ${aporte.descripcion}</p>
        <p><strong>Destino:</strong> ${aporte.destino}</p>
      `;
    } else if (aporte.tipoAporte === 'voluntariado') {
      contenidoAporte = `
        <p><strong>Tipo de Aporte:</strong> Voluntariado</p>
        <p><strong>Actividad:</strong> ${aporte.actividad}</p>
        <p><strong>Horas:</strong> ${aporte.horas}</p>
        <p><strong>Lugar:</strong> ${aporte.lugar}</p>
      `;
    }

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificado de Aporte - LA NATURALEZA</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 40px;
            background: #f5f5f5;
          }
          .certificado {
            background: white;
            padding: 60px;
            border: 10px solid #1e40af;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 48px;
            color: #1e40af;
            font-weight: bold;
            margin-bottom: 10px;
          }
          h1 {
            color: #1e40af;
            font-size: 36px;
            margin: 20px 0;
            text-align: center;
          }
          .contenido {
            margin: 40px 0;
            line-height: 1.8;
          }
          .nombre-beneficiario {
            text-align: center;
            font-size: 28px;
            color: #059669;
            font-weight: bold;
            margin: 30px 0;
            padding: 20px;
            background: #f0fdf4;
            border-radius: 10px;
          }
          .detalles {
            background: #f9fafb;
            padding: 30px;
            border-radius: 10px;
            margin: 30px 0;
          }
          .detalles p {
            margin: 10px 0;
            font-size: 16px;
          }
          .firma {
            margin-top: 60px;
            text-align: center;
          }
          .linea-firma {
            border-top: 2px solid #333;
            width: 300px;
            margin: 20px auto 10px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .actions {
            text-align: center;
            margin-top: 30px;
          }
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #1e40af;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 0 10px;
            font-weight: bold;
          }
          .btn:hover {
            background: #1e3a8a;
          }
          @media print {
            body { background: white; margin: 0; padding: 0; }
            .certificado { border: none; box-shadow: none; }
            .actions { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificado">
          <div class="header">
            <div class="logo">🌿 LA NATURALEZA</div>
            <p style="color: #666; font-size: 14px;">Defensoría del Pueblo</p>
          </div>

          <h1>CERTIFICADO DE APORTE SOLIDARIO</h1>

          <div class="contenido">
            <p style="text-align: center; font-size: 18px;">La plataforma <strong>LA NATURALEZA</strong> certifica que:</p>

            <div class="nombre-beneficiario">
              ${aporte.nombre}
            </div>

            <p style="text-align: center; font-size: 16px; color: #666;">
              ${aporte.cargo}<br>
              Ha realizado un aporte solidario a nuestra causa
            </p>

            <div class="detalles">
              ${contenidoAporte}
            </div>

            <p style="text-align: center; margin-top: 40px;">
              Agradecemos su compromiso y solidaridad con las comunidades afectadas.<br>
              Su aporte contribuye significativamente a mejorar la calidad de vida de las personas en situación de vulnerabilidad.
            </p>
          </div>

          <div class="firma">
            <div class="linea-firma"></div>
            <p><strong>Coordinación LA NATURALEZA</strong></p>
            <p style="color: #666; font-size: 14px;">Defensoría del Pueblo de Colombia</p>
          </div>

          <div class="footer">
            <p>Certificado expedido el ${fecha}</p>
            <p>ID del Aporte: #${aporte.id}</p>
            <p style="margin-top: 20px; font-size: 10px;">
              🤖 Generado con Claude Code - Este es un certificado de demostración
            </p>
          </div>
        </div>

        <div class="actions">
          <a href="#" onclick="window.print(); return false;" class="btn">🖨️ Imprimir</a>
          <a href="/aportes" class="btn">← Volver a Aportes</a>
        </div>
      </body>
      </html>
    `;
  }
}
