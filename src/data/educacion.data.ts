export interface Cuento {
  id: number;
  titulo: string;
  autor: string;
  idioma: string;
  categoria: string;
  resumen: string;
  edadRecomendada: string;
  duracionLectura: string;
  imagen: string;
}

export interface Juego {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  puntos: number;
  nivelDificultad: 'Fácil' | 'Medio' | 'Difícil';
  tematicas: string[];
  imagen: string;
  icono: string;
}

export const cuentosData: Cuento[] = [
  {
    id: 1,
    titulo: 'El árbol protector',
    autor: 'Equipo LA NATURALEZA',
    idioma: 'español',
    categoria: 'Solidaridad',
    resumen:
      'Historia sobre un árbol que protege a los animales del bosque durante una tormenta, enseñando el valor de la solidaridad.',
    edadRecomendada: '6-10 años',
    duracionLectura: '5 minutos',
    imagen: '/images/kids/cuento-arbol.png',
  },
  {
    id: 2,
    titulo: 'María y el río de colores',
    autor: 'Equipo LA NATURALEZA',
    idioma: 'español',
    categoria: 'Medio Ambiente',
    resumen:
      'María descubre cómo cuidar el río de su comunidad y enseña a otros niños sobre la importancia del agua.',
    edadRecomendada: '8-12 años',
    duracionLectura: '7 minutos',
    imagen: '/images/kids/cuento-rio.png',
  },
  {
    id: 3,
    titulo: 'Los guardianes del territorio',
    autor: 'Equipo LA NATURALEZA',
    idioma: 'español',
    categoria: 'Derechos Humanos',
    resumen:
      'Un grupo de niños aprende sobre sus derechos y cómo proteger su territorio de manera pacífica.',
    edadRecomendada: '10-14 años',
    duracionLectura: '10 minutos',
    imagen: '/images/kids/cuento-guardianes.png',
  },
];

export const juegosData: Juego[] = [
  {
    id: 1,
    nombre: 'Evacua Rápido',
    tipo: 'Simulación',
    descripcion: 'Aprende las rutas de evacuación en caso de emergencia',
    puntos: 100,
    nivelDificultad: 'Fácil',
    tematicas: ['Evacuación', 'Prevención', 'Seguridad'],
    imagen: '/images/kids/juego-evacua.png',
    icono: '🚨',
  },
  {
    id: 2,
    nombre: 'Detective del Agua',
    tipo: 'Trivia',
    descripcion: 'Responde preguntas sobre el cuidado del agua',
    puntos: 150,
    nivelDificultad: 'Medio',
    tematicas: ['Agua', 'Medio Ambiente'],
    imagen: '/images/kids/juego-agua.png',
    icono: '💧',
  },
  {
    id: 3,
    nombre: 'Construye tu Albergue',
    tipo: 'Estrategia',
    descripcion: 'Ayuda a construir un albergue seguro para tu comunidad',
    puntos: 200,
    nivelDificultad: 'Medio',
    tematicas: ['Solidaridad', 'Planificación', 'Comunidad'],
    imagen: '/images/kids/juego-albergue.png',
    icono: '🏠',
  },
  {
    id: 4,
    nombre: 'Héroes del Clima',
    tipo: 'Aventura',
    descripcion: 'Salva a tu comunidad de diferentes desastres naturales',
    puntos: 250,
    nivelDificultad: 'Difícil',
    tematicas: ['Prevención', 'Resiliencia', 'Naturaleza'],
    imagen: '/images/kids/juego-clima.png',
    icono: '🌪️',
  },
];
