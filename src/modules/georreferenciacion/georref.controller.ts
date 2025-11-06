import { Controller, Get, Render, Query, Param } from '@nestjs/common';
import { GeorreferenciaService } from './georref.service';

@Controller('mapa')
export class GeorreferenciaController {
  constructor(private readonly georreferenciaService: GeorreferenciaService) {}

  // Vista principal del mapa
  @Get()
  @Render('georreferenciacion/mapa')
  index(
    @Query('tipo') tipo?: string,
    @Query('prioridad') prioridad?: string,
    @Query('departamento') departamento?: string,
  ) {
    let zonas = this.georreferenciaService.getAllZonas();

    // Aplicar filtros si existen
    if (tipo && tipo !== 'todos') {
      zonas = this.georreferenciaService.getZonasByTipoNecesidad(tipo);
    }

    if (prioridad && prioridad !== 'todas') {
      zonas = this.georreferenciaService.getZonasByPrioridad(
        prioridad as 'urgente' | 'alta' | 'media' | 'baja'
      );
    }

    if (departamento && departamento !== 'todos') {
      zonas = this.georreferenciaService.getZonasByDepartamento(departamento);
    }

    const estadisticas = this.georreferenciaService.getEstadisticas();
    const centroMapa = this.georreferenciaService.getCentroMapa();

    // Obtener lista única de departamentos
    const departamentos = [...new Set(this.georreferenciaService.getAllZonas().map((z) => z.departamento))];

    return {
      title: 'Mapa de Zonas Afectadas',
      active: 'mapa',
      zonas,
      estadisticas,
      centroMapa,
      departamentos,
      filtros: {
        tipo: tipo || 'todos',
        prioridad: prioridad || 'todas',
        departamento: departamento || 'todos',
      },
    };
  }

  // API: Obtener todas las zonas en formato GeoJSON
  @Get('api/zonas')
  getZonasGeoJSON() {
    return {
      type: 'FeatureCollection',
      features: this.georreferenciaService.getZonasParaMapa(),
    };
  }

  // API: Obtener zona específica por ID
  @Get('api/zona/:id')
  getZonaById(@Param('id') id: string) {
    const zona = this.georreferenciaService.getZonaById(parseInt(id));
    return zona || { error: 'Zona no encontrada' };
  }

  // API: Obtener estadísticas
  @Get('api/estadisticas')
  getEstadisticas() {
    return this.georreferenciaService.getEstadisticas();
  }

  // API: Obtener zonas por filtros
  @Get('api/filtrar')
  getZonasFiltradas(
    @Query('tipo') tipo?: string,
    @Query('prioridad') prioridad?: string,
    @Query('departamento') departamento?: string,
  ) {
    let zonas = this.georreferenciaService.getAllZonas();

    if (tipo && tipo !== 'todos') {
      zonas = this.georreferenciaService.getZonasByTipoNecesidad(tipo);
    }

    if (prioridad && prioridad !== 'todas') {
      zonas = this.georreferenciaService.getZonasByPrioridad(
        prioridad as 'urgente' | 'alta' | 'media' | 'baja'
      );
    }

    if (departamento && departamento !== 'todos') {
      zonas = this.georreferenciaService.getZonasByDepartamento(departamento);
    }

    return zonas;
  }
}
