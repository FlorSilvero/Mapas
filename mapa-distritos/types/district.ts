/**
 * Tipo para representar una coordenada geográfica
 */
export interface Coordinate {
  lat: number;
  lng: number;
}

/**
 * Tipo para representar un distrito en el mapa
 */
export interface District {
  id: string;
  nombre: string;
  color: string;
  coordenadas: Coordinate[];
}
