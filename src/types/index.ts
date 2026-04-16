// ============================================================
// TIPOS PRINCIPALES DE LA APLICACIÓN
// Edita aquí para agregar o modificar campos de los edificios
// ============================================================

export type RiskLevel = 'low' | 'medium' | 'high' | '';

export type NavView = 'map' | 'buildings' | 'risks' | 'norms';

export interface Risk {
  id: string;
  name: string;
  description: string;
  level: RiskLevel;
  preventionMeasures: string;
  emergencyProcedures: string;
}

export interface NormDocument {
  id: string;
  name: string;
  description: string;
  fileOrLink: string;
}

export interface BuildingInfo {
  classrooms: string;
  directionOffice: string;
  womensRestrooms: string;
  mensRestrooms: string;
  teachersRestrooms: string;
  audiovisualRooms: string;
  teachersRooms: string;
  cubicles: string;
  adminOffices: string;
}

// Coordenadas del hotspot en porcentaje (left%, top%) relativo al contenedor del mapa
export interface HotspotPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Building {
  id: string;
  name: string;
  shortName: string;
  position: HotspotPosition;
  info: BuildingInfo;
  risks: Risk[];
  // IMÁGENES: Reemplaza los strings con rutas reales de imágenes
  // Ejemplo: '/images/edificio-a/foto1.jpg'
  images: string[];
  norms: NormDocument[];
  color?: string;
}

export type TabType = 'info' | 'risks' | 'gallery' | 'norms';
