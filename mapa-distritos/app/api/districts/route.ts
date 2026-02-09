import { NextRequest, NextResponse } from 'next/server';
import { readDistricts, writeDistricts, generateDistrictId, generateRandomColor } from '@/lib/districts';
import { District } from '@/types/district';

/**
 * GET /api/districts
 * Obtiene todos los distritos guardados
 */
export async function GET() {
  try {
    const districts = await readDistricts();
    return NextResponse.json(districts);
  } catch (error) {
    console.error('Error en GET /api/districts:', error);
    return NextResponse.json(
      { error: 'Error al obtener los distritos' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/districts
 * Crea un nuevo distrito
 * Body esperado: { nombre: string, coordenadas: Coordinate[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, coordenadas } = body;

    // Validar datos requeridos
    if (!nombre || !coordenadas || !Array.isArray(coordenadas)) {
      return NextResponse.json(
        { error: 'Nombre y coordenadas son requeridos' },
        { status: 400 }
      );
    }

    // Validar que las coordenadas tengan el formato correcto
    const isValid = coordenadas.every(
      (coord: any) => typeof coord.lat === 'number' && typeof coord.lng === 'number'
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Las coordenadas deben tener formato { lat: number, lng: number }' },
        { status: 400 }
      );
    }

    // Leer distritos existentes
    const districts = await readDistricts();

    // Crear nuevo distrito
    const newDistrict: District = {
      id: generateDistrictId(),
      nombre,
      color: generateRandomColor(),
      coordenadas,
    };

    // Agregar y guardar
    districts.push(newDistrict);
    await writeDistricts(districts);

    return NextResponse.json(newDistrict, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/districts:', error);
    return NextResponse.json(
      { error: 'Error al crear el distrito' },
      { status: 500 }
    );
  }
}
