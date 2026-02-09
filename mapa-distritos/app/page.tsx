'use client';

import dynamic from 'next/dynamic';

// Importar el mapa dinámicamente para evitar errores de SSR
// Leaflet usa 'window' que no está disponible en el servidor
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px]">
      <p>Cargando mapa...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Mapa de Distritos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Dibuja polígonos en el mapa para crear nuevos distritos. 
            Usa el botón <span className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">⬟</span> en la barra de herramientas.
          </p>
        </div>

        {/* Instrucciones */}
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h2 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            📝 Instrucciones:
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-300">
            <li>Haz clic en el ícono del polígono (⬟) en la barra de herramientas del mapa</li>
            <li>Haz clic en el mapa para crear los vértices del polígono</li>
            <li>Haz doble clic o cierra el polígono haciendo clic en el primer punto</li>
            <li>Ingresa el nombre del distrito cuando se solicite</li>
            <li>El distrito se guardará automáticamente con un color aleatorio</li>
          </ol>
        </div>

        {/* Mapa */}
        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <MapComponent height="600px" />
        </div>
      </main>
    </div>
  );
}
