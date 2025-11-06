import { Injectable } from '@nestjs/common';
import { cuentosData, juegosData, Cuento, Juego } from '../../data/educacion.data';

export interface Progreso {
  usuario: string;
  puntos: number;
  nivel: number;
  insignias: string[];
  cuentosLeidos: number[];
  juegosCompletados: number[];
  actividadesRealizadas: number;
}

@Injectable()
export class KidsService {
  private cuentos: Cuento[] = [...cuentosData];
  private juegos: Juego[] = [...juegosData];
  private progresos: Map<string, Progreso> = new Map();

  // Obtener todos los cuentos
  getAllCuentos(idioma?: string): Cuento[] {
    if (idioma) {
      return this.cuentos.filter((c) => c.idioma === idioma);
    }
    return this.cuentos;
  }

  // Obtener cuento por ID
  getCuentoById(id: number): Cuento | undefined {
    return this.cuentos.find((c) => c.id === id);
  }

  // Obtener cuentos por categoría
  getCuentosByCategoria(categoria: string): Cuento[] {
    return this.cuentos.filter((c) => c.categoria === categoria);
  }

  // Obtener todos los juegos
  getAllJuegos(): Juego[] {
    return this.juegos;
  }

  // Obtener juego por ID
  getJuegoById(id: number): Juego | undefined {
    return this.juegos.find((j) => j.id === id);
  }

  // Obtener juegos por dificultad
  getJuegosByDificultad(dificultad: 'Fácil' | 'Medio' | 'Difícil'): Juego[] {
    return this.juegos.filter((j) => j.nivelDificultad === dificultad);
  }

  // Obtener progreso del usuario
  getProgreso(usuario: string): Progreso {
    if (!this.progresos.has(usuario)) {
      this.progresos.set(usuario, {
        usuario,
        puntos: 0,
        nivel: 1,
        insignias: [],
        cuentosLeidos: [],
        juegosCompletados: [],
        actividadesRealizadas: 0,
      });
    }
    return this.progresos.get(usuario)!;
  }

  // Registrar cuento leído
  registrarCuentoLeido(usuario: string, cuentoId: number): Progreso {
    const progreso = this.getProgreso(usuario);

    if (!progreso.cuentosLeidos.includes(cuentoId)) {
      progreso.cuentosLeidos.push(cuentoId);
      progreso.puntos += 50;
      progreso.actividadesRealizadas++;

      // Verificar nuevas insignias
      this.verificarInsignias(progreso);
      this.actualizarNivel(progreso);
    }

    return progreso;
  }

  // Registrar juego completado
  registrarJuegoCompletado(usuario: string, juegoId: number): Progreso {
    const progreso = this.getProgreso(usuario);
    const juego = this.getJuegoById(juegoId);

    if (juego && !progreso.juegosCompletados.includes(juegoId)) {
      progreso.juegosCompletados.push(juegoId);
      progreso.puntos += juego.puntos;
      progreso.actividadesRealizadas++;

      this.verificarInsignias(progreso);
      this.actualizarNivel(progreso);
    }

    return progreso;
  }

  // Agregar puntos por actividad
  agregarPuntos(usuario: string, puntos: number, actividad: string): Progreso {
    const progreso = this.getProgreso(usuario);
    progreso.puntos += puntos;
    progreso.actividadesRealizadas++;

    this.verificarInsignias(progreso);
    this.actualizarNivel(progreso);

    return progreso;
  }

  // Verificar y otorgar insignias
  private verificarInsignias(progreso: Progreso): void {
    const insigniasDisponibles = [
      { nombre: 'Primer Paso', requisito: () => progreso.actividadesRealizadas >= 1 },
      { nombre: 'Lector Curioso', requisito: () => progreso.cuentosLeidos.length >= 3 },
      { nombre: 'Jugador Experto', requisito: () => progreso.juegosCompletados.length >= 5 },
      { nombre: 'Explorador', requisito: () => progreso.puntos >= 500 },
      { nombre: 'Guardián de la Naturaleza', requisito: () => progreso.puntos >= 1000 },
      { nombre: 'Héroe Comunitario', requisito: () => progreso.actividadesRealizadas >= 20 },
    ];

    insigniasDisponibles.forEach((insignia) => {
      if (
        insignia.requisito() &&
        !progreso.insignias.includes(insignia.nombre)
      ) {
        progreso.insignias.push(insignia.nombre);
      }
    });
  }

  // Actualizar nivel basado en puntos
  private actualizarNivel(progreso: Progreso): void {
    const nivelAnterior = progreso.nivel;
    progreso.nivel = Math.floor(progreso.puntos / 200) + 1;

    // Límite de nivel
    if (progreso.nivel > 10) {
      progreso.nivel = 10;
    }
  }

  // Obtener contenidos educativos
  getContenidosEducativos() {
    return {
      derechosHumanos: [
        {
          id: 1,
          titulo: '¿Qué son los Derechos Humanos?',
          descripcion: 'Todos tenemos derechos por el simple hecho de existir',
          contenido: 'Los derechos humanos son como las reglas del juego de la vida...',
          imagen: '/images/kids/derechos-humanos.png',
        },
        {
          id: 2,
          titulo: 'Derecho a la Educación',
          descripcion: 'Todos los niños tienen derecho a aprender',
          contenido: 'La educación te ayuda a conocer el mundo...',
          imagen: '/images/kids/educacion.png',
        },
        {
          id: 3,
          titulo: 'Derecho a un Ambiente Sano',
          descripcion: 'Tenemos derecho a vivir en un lugar limpio y seguro',
          contenido: 'La naturaleza es nuestro hogar...',
          imagen: '/images/kids/ambiente.png',
        },
      ],
      resiliencia: [
        {
          id: 4,
          titulo: 'Ser Fuerte en Momentos Difíciles',
          descripcion: 'Aprende a enfrentar los desafíos con valentía',
          contenido: 'Cuando algo difícil sucede, podemos ser fuertes...',
          imagen: '/images/kids/resiliencia.png',
        },
      ],
      autocuidado: [
        {
          id: 5,
          titulo: 'Cuidar de Nosotros Mismos',
          descripcion: 'Es importante cuidar de nuestra salud y bienestar',
          contenido: 'Cuidarte a ti mismo es muy importante...',
          imagen: '/images/kids/autocuidado.png',
        },
      ],
    };
  }

  // Obtener estadísticas generales
  getEstadisticas() {
    const totalUsuarios = this.progresos.size;
    let totalPuntos = 0;
    let totalActividades = 0;

    this.progresos.forEach((progreso) => {
      totalPuntos += progreso.puntos;
      totalActividades += progreso.actividadesRealizadas;
    });

    return {
      totalUsuarios,
      totalCuentos: this.cuentos.length,
      totalJuegos: this.juegos.length,
      totalPuntos,
      totalActividades,
    };
  }
}
