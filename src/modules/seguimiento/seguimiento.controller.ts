import { Controller, Get, Render, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SeguimientoService } from './seguimiento.service';

@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  // Vista principal de seguimiento
  @Get()
  @Render('seguimiento/index')
  index() {
    const indicadores = this.seguimientoService.getIndicadores();
    const resumenImpacto = this.seguimientoService.getResumenImpacto();
    const lineaTiempo = this.seguimientoService.getLineaTiempo();

    return {
      title: 'Seguimiento en Tiempo Real',
      active: 'seguimiento',
      indicadores,
      resumenImpacto,
      lineaTiempo,
    };
  }

  // API: Obtener datos para gráfico de aportes por mes
  @Get('api/grafico-aportes')
  getGraficoAportes() {
    const datos = this.seguimientoService.getDatosGraficos();
    return datos.aportePorMes;
  }

  // API: Obtener datos para gráfico de distribución de ayuda
  @Get('api/grafico-distribucion')
  getGraficoDistribucion() {
    return this.seguimientoService.getDistribucionRecursos();
  }

  // API: Obtener datos para gráfico de beneficiados por región
  @Get('api/grafico-regiones')
  getGraficoBeneficiados() {
    return this.seguimientoService.getEficienciaPorRegion();
  }

  // API: Obtener evolución temporal
  @Get('api/grafico-evolucion')
  getGraficoEvolucion() {
    return this.seguimientoService.getEvolucionTemporal();
  }

  // API: Obtener línea de tiempo
  @Get('api/linea-tiempo')
  getLineaTiempo() {
    return this.seguimientoService.getLineaTiempo();
  }

  // API: Obtener resumen de impacto
  @Get('api/resumen-impacto')
  getResumenImpacto() {
    return this.seguimientoService.getResumenImpacto();
  }

  // Generar reporte PDF (simulado)
  @Get('reporte/pdf')
  generarReportePDF(@Res() res: Response) {
    const reporte = this.seguimientoService.generarReporte('pdf');

    // Simulación de generación de PDF
    const html = this.generarHTMLReporte(reporte);

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  // Generar reporte Excel (simulado)
  @Get('reporte/excel')
  generarReporteExcel(@Res() res: Response) {
    const reporte = this.seguimientoService.generarReporte('excel');

    // Simulación de generación de Excel (retornamos JSON)
    res.setHeader('Content-Type', 'application/json');
    res.json({
      ...reporte,
      nota: 'En producción, este endpoint generaría un archivo Excel real',
    });
  }

  // Método privado para generar HTML del reporte
  private generarHTMLReporte(reporte: any): string {
    const fecha = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Seguimiento - LA NATURALEZA</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            max-width: 900px;
            margin: 40px auto;
            padding: 40px;
            background: #f5f5f5;
          }
          .reporte {
            background: white;
            padding: 60px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #1e40af;
          }
          .logo {
            font-size: 42px;
            color: #1e40af;
            font-weight: bold;
            margin-bottom: 10px;
          }
          h1 {
            color: #1e40af;
            font-size: 32px;
            margin: 20px 0;
          }
          h2 {
            color: #374151;
            font-size: 24px;
            margin: 30px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
          }
          .stat-box {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #1e40af;
          }
          .stat-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          .stat-value {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
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
            .reporte { box-shadow: none; }
            .actions { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="reporte">
          <div class="header">
            <div class="logo">🌿 LA NATURALEZA</div>
            <p style="color: #666; font-size: 14px;">Defensoría del Pueblo - Sistema de Seguimiento</p>
            <h1>Reporte de Seguimiento y Métricas</h1>
            <p style="color: #666;">Generado el ${fecha}</p>
          </div>

          <h2>📊 Indicadores Principales</h2>
          <div class="stats-grid">
            <div class="stat-box">
              <div class="stat-label">Total Aportes</div>
              <div class="stat-value">${reporte.datos.totalAportes}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Monto Total</div>
              <div class="stat-value">$${reporte.datos.montoTotal.toLocaleString('es-CO')}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Personas Beneficiadas</div>
              <div class="stat-value">${reporte.datos.totalBeneficiados.toLocaleString('es-CO')}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Zonas Intervenidas</div>
              <div class="stat-value">${reporte.datos.totalZonas}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Intervenciones Completadas</div>
              <div class="stat-value">${reporte.datos.intervencionesCompletadas}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Tasa de Crecimiento</div>
              <div class="stat-value" style="color: #10b981;">${reporte.datos.tasaCrecimiento}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Eficiencia de Entrega</div>
              <div class="stat-value" style="color: #10b981;">${reporte.datos.eficienciaEntrega}</div>
            </div>
          </div>

          <h2>📈 Resumen de Impacto</h2>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Total de Aportes Recibidos:</strong> ${reporte.datos.totalAportes} contribuciones</p>
            <p style="margin: 10px 0;"><strong>Monto Total Recaudado:</strong> $${reporte.datos.montoTotal.toLocaleString('es-CO')} COP</p>
            <p style="margin: 10px 0;"><strong>Personas Beneficiadas:</strong> ${reporte.datos.totalBeneficiados.toLocaleString('es-CO')} personas</p>
            <p style="margin: 10px 0;"><strong>Zonas Atendidas:</strong> ${reporte.datos.totalZonas} zonas en 5 departamentos</p>
            <p style="margin: 10px 0;"><strong>Intervenciones Completadas:</strong> ${reporte.datos.intervencionesCompletadas} de forma exitosa</p>
            <p style="margin: 10px 0;"><strong>Crecimiento vs Mes Anterior:</strong> <span style="color: #10b981;">${reporte.datos.tasaCrecimiento}</span></p>
            <p style="margin: 10px 0;"><strong>Eficiencia de Entrega:</strong> <span style="color: #10b981;">${reporte.datos.eficienciaEntrega}</span></p>
          </div>

          <h2>ℹ️ Información del Reporte</h2>
          <p><strong>Tipo de Reporte:</strong> ${reporte.tipo.toUpperCase()}</p>
          <p><strong>Fecha de Generación:</strong> ${reporte.fechaGeneracion}</p>
          <p><strong>Nombre del Archivo:</strong> ${reporte.nombreArchivo}</p>
          <p><strong>Estado:</strong> <span style="color: #10b981;">✓ ${reporte.mensaje}</span></p>

          <div class="footer">
            <p><strong>LA NATURALEZA - Plataforma de Gestión Solidaria</strong></p>
            <p>Defensoría del Pueblo de Colombia</p>
            <p style="margin-top: 15px; font-size: 10px;">
              🤖 Reporte generado automáticamente - Este es un reporte de demostración
            </p>
          </div>
        </div>

        <div class="actions">
          <a href="#" onclick="window.print(); return false;" class="btn">🖨️ Imprimir</a>
          <a href="/seguimiento" class="btn">← Volver a Seguimiento</a>
        </div>
      </body>
      </html>
    `;
  }
}
