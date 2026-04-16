// ============================================================
// DATOS DE LOS EDIFICIOS DEL CAMPUS UTEQ
//
// INSTRUCCIONES PARA EDITAR:
// 1. Busca el edificio que quieres modificar por su 'id'
// 2. Rellena los campos de 'info' con los datos reales
// 3. Agrega riesgos en el arreglo 'risks'
// 4. Reemplaza los paths de 'images' con rutas reales
// 5. Para agregar un nuevo edificio, copia el bloque
//    de un edificio existente y agrega al arreglo
//
// POSICIÓN EN EL MAPA:
// Las coordenadas son en porcentaje (0-100) relativas al mapa.
// left: posición horizontal, top: posición vertical
// width/height: tamaño del área clickeable en porcentaje
// ============================================================

import { Building } from '../types';

// ─── PLANTILLA VACÍA DE INFORMACIÓN ─────────────────────────
const emptyInfo = {
  classrooms: '--',
  directionOffice: '--',
  womensRestrooms: '--',
  mensRestrooms: '--',
  teachersRestrooms: '--',
  audiovisualRooms: '--',
  teachersRooms: '--',
  cubicles: '--',
  adminOffices: '--',
};

// ─── FUNCIÓN PARA CREAR IMÁGENES PLACEHOLDER ────────────────
// REEMPLAZA: Sustituye cada string con la ruta real de la imagen
// Ejemplo: '/images/edificio-auditorio/imagen1.jpg'
const placeholderImages = (buildingId: string): string[] =>
  Array.from({ length: 10 }, (_, i) => `/images/${buildingId}/image${i + 1}.jpg`);

// ─── EDIFICIOS DEL CAMPUS ────────────────────────────────────
// Agrega nuevos edificios al final de este arreglo
export const buildings: Building[] = [
  // ──────────────────────────────────────────────────────────
  // EDIFICIO: AUDITORIO
  // Coordenadas: ajusta left/top si el hotspot no coincide
  // ──────────────────────────────────────────────────────────
  {
    id: 'auditorio',
    name: 'Auditorio',
    shortName: 'AUD',
    position: { left: 15.5, top: 49.5, width: 8, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('auditorio'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: IDIOMAS
  // ──────────────────────────────────────────────────────────
  {
    id: 'idiomas',
    name: 'Idiomas',
    shortName: 'IDI',
    position: { left: 21.5, top: 68.5, width: 7, height: 4.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('idiomas'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: J
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-j',
    name: 'Edificio J',
    shortName: 'J',
    position: { left: 29.5, top: 59, width: 6.5, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-j'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: H
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-h',
    name: 'Edificio H',
    shortName: 'H',
    position: { left: 43.5, top: 55.5, width: 7, height: 5.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-h'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: NANO
  // ──────────────────────────────────────────────────────────
  {
    id: 'nano',
    name: 'Nano',
    shortName: 'NANO',
    position: { left: 41, top: 49, width: 7, height: 4.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('nano'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: I
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-i',
    name: 'Edificio I',
    shortName: 'I',
    position: { left: 50, top: 60.5, width: 7, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-i'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: G
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-g',
    name: 'Edificio G',
    shortName: 'G',
    position: { left: 63, top: 50, width: 7, height: 5.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-g'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: BIBLIOTECA
  // ──────────────────────────────────────────────────────────
  {
    id: 'biblioteca',
    name: 'Biblioteca',
    shortName: 'BIB',
    position: { left: 62.5, top: 60, width: 8, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('biblioteca'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: K
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-k',
    name: 'Edificio K',
    shortName: 'K',
    position: { left: 45.5, top: 69.5, width: 7, height: 5.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-k'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: F
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-f',
    name: 'Edificio F',
    shortName: 'F',
    position: { left: 62.5, top: 67.5, width: 7.5, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-f'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: RECTORÍA
  // ──────────────────────────────────────────────────────────
  {
    id: 'rectoria',
    name: 'Rectoría',
    shortName: 'REC',
    position: { left: 38, top: 75, width: 8, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('rectoria'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: D
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-d',
    name: 'Edificio D',
    shortName: 'D',
    position: { left: 53, top: 75, width: 7, height: 6 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-d'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: E (zona sur)
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-e-sur',
    name: 'Edificio E',
    shortName: 'E',
    position: { left: 62, top: 75, width: 6, height: 5.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-e-sur'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: C
  // ──────────────────────────────────────────────────────────
  {
    id: 'edificio-c',
    name: 'Edificio C',
    shortName: 'C',
    position: { left: 46, top: 81.5, width: 8, height: 5.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('edificio-c'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: HUB (Student Talent Hub)
  // ──────────────────────────────────────────────────────────
  {
    id: 'hub',
    name: 'Student Talent Hub',
    shortName: 'HUB',
    position: { left: 31.5, top: 80.5, width: 7.5, height: 5.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('hub'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: STELLANTIS
  // ──────────────────────────────────────────────────────────
  {
    id: 'stellantis',
    name: 'Stellantis',
    shortName: 'STL',
    position: { left: 65, top: 33.5, width: 9, height: 5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('stellantis'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: ALMACÉN
  // ──────────────────────────────────────────────────────────
  {
    id: 'almacen',
    name: 'Almacén',
    shortName: 'ALM',
    position: { left: 60, top: 40.5, width: 8, height: 4.5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('almacen'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: PIDET
  // ──────────────────────────────────────────────────────────
  {
    id: 'pidet',
    name: 'PIDET',
    shortName: 'PID',
    position: { left: 64, top: 8.5, width: 9, height: 5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('pidet'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // EDIFICIO: CIC 4.0
  // ──────────────────────────────────────────────────────────
  {
    id: 'cic40',
    name: 'CIC 4.0',
    shortName: 'CIC',
    position: { left: 63, top: 17.5, width: 8.5, height: 5 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('cic40'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // ÁREA: CANCHA FÚTBOL
  // ──────────────────────────────────────────────────────────
  {
    id: 'cancha-futbol',
    name: 'Cancha de Fútbol',
    shortName: 'CF',
    position: { left: 29, top: 12, width: 22, height: 20 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('cancha-futbol'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // ÁREA: CANCHA FÚTBOL RÁPIDO
  // ──────────────────────────────────────────────────────────
  {
    id: 'cancha-futbol-rapido',
    name: 'Cancha Fútbol Rápido',
    shortName: 'CFR',
    position: { left: 15, top: 29.5, width: 10, height: 8 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('cancha-futbol-rapido'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // ÁREA: BASKETBALL
  // ──────────────────────────────────────────────────────────
  {
    id: 'basketball',
    name: 'Basketball',
    shortName: 'BSK',
    position: { left: 26, top: 43, width: 5, height: 8 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('basketball'),
    norms: [],
  },

  // ──────────────────────────────────────────────────────────
  // ÁREA: CANCHA (sur)
  // ──────────────────────────────────────────────────────────
  {
    id: 'cancha-sur',
    name: 'Cancha',
    shortName: 'CAN',
    position: { left: 22, top: 79, width: 8, height: 7 },
    info: { ...emptyInfo },
    risks: [],
    images: placeholderImages('cancha-sur'),
    norms: [],
  },
];
