import { Controller, Get, Post, Body, Query, Param, Render, Redirect, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AlertasService } from './alertas.service';

@Controller('alertas')
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  // ==================== VISTAS ====================

  @Get()
  @Render('alertas/index')
  index(
    @Query('severidad') severidad?: string,
    @Query('tipo') tipo?: string,
    @Query('region') region?: string,
    @Query('estado') estado?: string,
  ) {
    const filtros = { severidad, tipo, region, estado };
    const alertas = this.alertasService.filtrarAlertas(filtros);
    const estadisticas = this.alertasService.getEstadisticas();
    const regiones = this.alertasService.getRegionesAfectadas();
    const tiposAlerta = this.alertasService.getTiposAlertaDisponibles();
    const nivelesSeveridad = this.alertasService.getNivelesSeveridad();

    return {
      alertas,
      estadisticas,
      filtros,
      regiones,
      tiposAlerta,
      nivelesSeveridad,
    };
  }

  @Get('alerta/:id')
  @Render('alertas/detalle')
  detalleAlerta(@Param('id') id: string) {
    const alerta = this.alertasService.getAlertaById(parseInt(id));
    if (!alerta) {
      return { error: 'Alerta no encontrada' };
    }

    return { alerta };
  }

  @Get('suscripcion')
  @Render('alertas/suscripcion')
  paginaSuscripcion(@Query('exito') exito?: string) {
    const departamentos = this.alertasService.getDepartamentosAfectados();
    const tiposAlerta = this.alertasService.getTiposAlertaDisponibles();
    const nivelesSeveridad = this.alertasService.getNivelesSeveridad();

    return {
      departamentos,
      tiposAlerta,
      nivelesSeveridad,
      mensajeExito: exito === '1' ? 'Suscripción creada exitosamente' : null,
    };
  }

  @Get('albergues')
  @Render('alertas/albergues')
  paginaAlbergues(
    @Query('departamento') departamento?: string,
    @Query('municipio') municipio?: string,
    @Query('estado') estado?: string,
  ) {
    const filtros = { departamento, municipio, estado };
    const albergues = this.alertasService.filtrarAlbergues(filtros);
    const rutasEvacuacion = this.alertasService.getAllRutasEvacuacion();
    const capacidad = this.alertasService.getCapacidadTotal();
    const estadisticas = this.alertasService.getEstadisticas();

    // Obtener departamentos y municipios únicos
    const todosAlbergues = this.alertasService.getAllAlbergues();
    const departamentos = [...new Set(todosAlbergues.map((a) => a.departamento))];
    const municipios = [...new Set(todosAlbergues.map((a) => a.municipio))];

    return {
      albergues,
      rutasEvacuacion,
      capacidad,
      estadisticas,
      filtros,
      departamentos,
      municipios,
    };
  }

  @Get('autocuidado')
  @Render('alertas/autocuidado')
  paginaAutocuidado(@Query('tipo') tipo?: string) {
    const medidasAutocuidado = this.alertasService.getAllMedidasAutocuidado();
    const medidaSeleccionada = tipo
      ? this.alertasService.getMedidasPorTipo(tipo)
      : null;

    return {
      medidasAutocuidado,
      medidaSeleccionada,
      tipoSeleccionado: tipo,
    };
  }

  // ==================== ACCIONES POST ====================

  @Post('suscripcion')
  @Redirect('/alertas/suscripcion?exito=1', 302)
  crearSuscripcion(@Body() body: any) {
    const tiposAlerta = Array.isArray(body.tiposAlerta)
      ? body.tiposAlerta
      : [body.tiposAlerta].filter(Boolean);

    const nivelesInteres = Array.isArray(body.nivelesInteres)
      ? body.nivelesInteres
      : [body.nivelesInteres].filter(Boolean);

    this.alertasService.crearSuscripcion({
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      departamento: body.departamento,
      municipio: body.municipio,
      tiposAlerta,
      nivelesInteres,
    });

    return;
  }

  // ==================== API ENDPOINTS ====================

  @Get('api/alertas')
  getAlertasAPI(
    @Query('severidad') severidad?: string,
    @Query('tipo') tipo?: string,
    @Query('region') region?: string,
  ) {
    const filtros = { severidad, tipo, region };
    return this.alertasService.filtrarAlertas(filtros);
  }

  @Get('api/alertas/:id')
  getAlertaByIdAPI(@Param('id') id: string) {
    const alerta = this.alertasService.getAlertaById(parseInt(id));
    if (!alerta) {
      return { error: 'Alerta no encontrada' };
    }
    return alerta;
  }

  @Get('api/albergues')
  getAlberguesAPI(
    @Query('departamento') departamento?: string,
    @Query('municipio') municipio?: string,
    @Query('estado') estado?: string,
    @Query('capacidadMinima') capacidadMinima?: string,
  ) {
    const filtros = {
      departamento,
      municipio,
      estado,
      capacidadMinima: capacidadMinima ? parseInt(capacidadMinima) : undefined,
    };
    return this.alertasService.filtrarAlbergues(filtros);
  }

  @Get('api/rutas')
  getRutasAPI(@Query('municipio') municipio?: string) {
    if (municipio) {
      return this.alertasService.filtrarRutasPorMunicipio(municipio);
    }
    return this.alertasService.getAllRutasEvacuacion();
  }

  @Get('api/estadisticas')
  getEstadisticasAPI() {
    return this.alertasService.getEstadisticas();
  }

  @Get('api/autocuidado/:tipo')
  getMedidasAutocuidadoAPI(@Param('tipo') tipo: string) {
    const medidas = this.alertasService.getMedidasPorTipo(tipo);
    if (!medidas) {
      return { error: 'Tipo de emergencia no encontrado' };
    }
    return medidas;
  }

  @Post('api/suscripcion')
  crearSuscripcionAPI(@Body() body: any, @Res() res: Response) {
    try {
      const suscripcion = this.alertasService.crearSuscripcion(body);
      return res.status(201).json({
        exito: true,
        mensaje: 'Suscripción creada exitosamente',
        suscripcion,
      });
    } catch (error) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Error al crear la suscripción',
        error: error.message,
      });
    }
  }
}
