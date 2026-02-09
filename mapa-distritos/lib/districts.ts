import { promises as fs } from 'fs';
import path from 'path';
import { District } from '@/types/district';

// Ruta al archivo JSON donde se guardan los distritos
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'districts.json');

/**
 * Lee los distritos del archivo JSON
 * @returns Promise con el array de distritos
 */
export async function readDistricts(): Promise<District[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // Si el archivo no existe o está vacío, retornar array vacío
    console.error('Error leyendo distritos:', error);
    return [];
  }
}

/**
 * Escribe los distritos en el archivo JSON
 * @param districts - Array de distritos a guardar
 */
export async function writeDistricts(districts: District[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(districts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error escribiendo distritos:', error);
    throw new Error('No se pudo guardar el archivo de distritos');
  }
}

/**
 * Genera un color aleatorio en formato hexadecimal
 * @returns Color en formato #RRGGBB
 */
export function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Genera un ID único para un distrito
 * @returns ID único basado en timestamp y número aleatorio
 */
export function generateDistrictId(): string {
  return `district-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
