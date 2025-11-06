import { Controller, Get, Post, Body, Render, Param, Query, Redirect } from '@nestjs/common';
import { ComunicacionService } from './comunicacion.service';

@Controller('comunicacion')
export class ComunicacionController {
  constructor(private readonly comunicacionService: ComunicacionService) {}

  // Vista principal - Galería de reportes
  @Get()
  @Render('comunicacion/index')
  index(
    @Query('estado') estado?: string,
    @Query('urgencia') urgencia?: string,
    @Query('tipo') tipo?: string,
    @Query('region') region?: string,
    @Query('exito') exito?: string,
  ) {
    const filtros: any = {};
    if (estado) filtros.estado = estado;
    if (urgencia) filtros.urgencia = urgencia;
    if (tipo) filtros.tipo = tipo;
    if (region) filtros.region = region;

    const reportes =
      Object.keys(filtros).length > 0
        ? this.comunicacionService.filtrarReportes(filtros)
        : this.comunicacionService.getAllReportes();

    const estadisticas = this.comunicacionService.getEstadisticas();
    const regiones = this.comunicacionService.getRegiones();
    const tiposNecesidad = this.comunicacionService.getTiposNecesidad();

    return {
      title: 'Comunicación Comunitaria',
      active: 'comunicacion',
      reportes,
      estadisticas,
      regiones,
      tiposNecesidad,
      filtros: {
        estado: estado || '',
        urgencia: urgencia || '',
        tipo: tipo || '',
        region: region || '',
      },
      mensajeExito: exito === '1' ? 'Reporte enviado exitosamente' : null,
    };
  }

  // Vista formulario nuevo reporte
  @Get('nuevo')
  @Render('comunicacion/nuevo')
  nuevoReporte() {
    const regiones = ['Caribe', 'Pacífico', 'Andina', 'Orinoquía', 'Amazonía', 'Insular'];
    const departamentos = this.comunicacionService.getDepartamentos();
    const tiposNecesidad = this.comunicacionService.getTiposNecesidad();

    return {
      title: 'Nuevo Reporte Comunitario',
      active: 'comunicacion',
      regiones,
      departamentos,
      tiposNecesidad,
    };
  }

  // Vista detalle de reporte
  @Get('reporte/:id')
  @Render('comunicacion/detalle')
  detalleReporte(@Param('id') id: string, @Query('respuesta') respuesta?: string) {
    const reporte = this.comunicacionService.getReporteById(parseInt(id));

    if (!reporte) {
      return {
        title: 'Reporte no encontrado',
        active: 'comunicacion',
        error: 'No se encontró el reporte solicitado',
      };
    }

    return {
      title: `Reporte #${reporte.id}`,
      active: 'comunicacion',
      reporte,
      mensajeExito: respuesta === '1' ? 'Respuesta agregada exitosamente' : null,
    };
  }

  // Crear nuevo reporte
  @Post('nuevo')
  @Redirect('/comunicacion?exito=1', 302)
  crearReporte(@Body() body: any) {
    this.comunicacionService.createReporte({
      nombreReportante: body.nombreReportante,
      cargoRol: body.cargoRol,
      region: body.region,
      departamento: body.departamento,
      municipio: body.municipio,
      tipoNecesidad: body.tipoNecesidad,
      descripcion: body.descripcion,
      nivelUrgencia: body.nivelUrgencia,
      personasAfectadas: body.personasAfectadas ? parseInt(body.personasAfectadas) : undefined,
      archivoAdjunto: body.archivoAdjunto || undefined,
    });

    return {};
  }

  // Agregar respuesta a reporte
  @Post('reporte/:id/respuesta')
  @Redirect()
  agregarRespuesta(@Param('id') id: string, @Body() body: any) {
    this.comunicacionService.agregarRespuesta(parseInt(id), {
      autor: body.autor,
      cargo: body.cargo,
      mensaje: body.mensaje,
      tipo: body.tipo || 'comentario',
    });

    return { url: `/comunicacion/reporte/${id}?respuesta=1` };
  }

  // Cambiar estado de reporte
  @Post('reporte/:id/estado')
  @Redirect()
  cambiarEstado(@Param('id') id: string, @Body() body: any) {
    this.comunicacionService.cambiarEstado(parseInt(id), body.estado);
    return { url: `/comunicacion/reporte/${id}` };
  }

  // API: Obtener todos los reportes
  @Get('api/reportes')
  getReportes(@Query() filtros: any) {
    if (Object.keys(filtros).length > 0) {
      return this.comunicacionService.filtrarReportes(filtros);
    }
    return this.comunicacionService.getAllReportes();
  }

  // API: Obtener estadísticas
  @Get('api/estadisticas')
  getEstadisticas() {
    return this.comunicacionService.getEstadisticas();
  }

  // API: Buscar reportes
  @Get('api/buscar')
  buscarReportes(@Query('q') query: string) {
    if (!query) {
      return [];
    }
    return this.comunicacionService.buscarReportes(query);
  }
}
