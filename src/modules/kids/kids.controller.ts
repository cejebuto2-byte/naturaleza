import { Controller, Get, Post, Render, Param, Query, Body } from '@nestjs/common';
import { KidsService } from './kids.service';

@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService) {}

  // Vista principal de KIDS
  @Get()
  @Render('kids/index')
  index(@Query('usuario') usuario?: string) {
    const nombreUsuario = usuario || 'invitado';
    const progreso = this.kidsService.getProgreso(nombreUsuario);
    const estadisticas = this.kidsService.getEstadisticas();

    return {
      title: 'LA NATURALEZA KIDS',
      active: 'kids',
      usuario: nombreUsuario,
      progreso,
      estadisticas,
    };
  }

  // Sección Aprende
  @Get('aprende')
  @Render('kids/aprende')
  aprende(@Query('usuario') usuario?: string) {
    const nombreUsuario = usuario || 'invitado';
    const progreso = this.kidsService.getProgreso(nombreUsuario);
    const contenidos = this.kidsService.getContenidosEducativos();

    return {
      title: 'Aprende',
      active: 'kids',
      usuario: nombreUsuario,
      progreso,
      contenidos,
    };
  }

  // Sección Juega
  @Get('juega')
  @Render('kids/juega')
  juega(@Query('usuario') usuario?: string) {
    const nombreUsuario = usuario || 'invitado';
    const progreso = this.kidsService.getProgreso(nombreUsuario);
    const juegos = this.kidsService.getAllJuegos();

    return {
      title: 'Juega',
      active: 'kids',
      usuario: nombreUsuario,
      progreso,
      juegos,
    };
  }

  // Sección Cuentos
  @Get('cuentos')
  @Render('kids/cuentos')
  cuentos(@Query('usuario') usuario?: string, @Query('idioma') idioma?: string) {
    const nombreUsuario = usuario || 'invitado';
    const progreso = this.kidsService.getProgreso(nombreUsuario);
    const cuentos = this.kidsService.getAllCuentos(idioma);

    return {
      title: 'Cuentos',
      active: 'kids',
      usuario: nombreUsuario,
      progreso,
      cuentos,
      idiomaSeleccionado: idioma || 'español',
    };
  }

  // Leer cuento específico
  @Get('cuento/:id')
  @Render('kids/leer-cuento')
  leerCuento(@Param('id') id: string, @Query('usuario') usuario?: string) {
    const nombreUsuario = usuario || 'invitado';
    const cuento = this.kidsService.getCuentoById(parseInt(id));

    if (!cuento) {
      return {
        title: 'Cuento no encontrado',
        active: 'kids',
        error: 'No encontramos ese cuento',
      };
    }

    // Registrar cuento como leído
    const progreso = this.kidsService.registrarCuentoLeido(nombreUsuario, parseInt(id));

    return {
      title: cuento.titulo,
      active: 'kids',
      usuario: nombreUsuario,
      cuento,
      progreso,
    };
  }

  // Jugar juego específico
  @Get('juego/:id')
  @Render('kids/jugar')
  jugar(@Param('id') id: string, @Query('usuario') usuario?: string) {
    const nombreUsuario = usuario || 'invitado';
    const juego = this.kidsService.getJuegoById(parseInt(id));
    const progreso = this.kidsService.getProgreso(nombreUsuario);

    if (!juego) {
      return {
        title: 'Juego no encontrado',
        active: 'kids',
        error: 'No encontramos ese juego',
      };
    }

    return {
      title: juego.nombre,
      active: 'kids',
      usuario: nombreUsuario,
      juego,
      progreso,
    };
  }

  // API: Completar juego
  @Post('api/completar-juego')
  completarJuego(@Body() body: { usuario: string; juegoId: number }) {
    const progreso = this.kidsService.registrarJuegoCompletado(body.usuario, body.juegoId);
    return {
      exito: true,
      mensaje: '¡Felicitaciones! Has completado el juego',
      progreso,
    };
  }

  // API: Agregar puntos
  @Post('api/agregar-puntos')
  agregarPuntos(@Body() body: { usuario: string; puntos: number; actividad: string }) {
    const progreso = this.kidsService.agregarPuntos(body.usuario, body.puntos, body.actividad);
    return {
      exito: true,
      progreso,
    };
  }

  // API: Obtener progreso
  @Get('api/progreso/:usuario')
  getProgreso(@Param('usuario') usuario: string) {
    return this.kidsService.getProgreso(usuario);
  }

  // API: Obtener cuentos
  @Get('api/cuentos')
  getCuentos(@Query('idioma') idioma?: string) {
    return this.kidsService.getAllCuentos(idioma);
  }

  // API: Obtener juegos
  @Get('api/juegos')
  getJuegos() {
    return this.kidsService.getAllJuegos();
  }
}
