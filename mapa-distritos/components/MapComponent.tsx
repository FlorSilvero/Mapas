'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Tooltip } from 'react-leaflet';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { District } from '@/types/district';

// Fix para los iconos de Leaflet en Next.js
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  height?: string;
}

export default function MapComponent({ height = '600px' }: MapComponentProps) {
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Asegurar que el componente esté montado antes de renderizar el mapa
  useEffect(() => {
    setIsMounted(true);
    loadDistricts();
  }, []);

  /**
   * Carga los distritos desde la API
   */
  const loadDistricts = async () => {
    try {
      const response = await fetch('/api/districts');
      if (response.ok) {
        const data = await response.json();
        setDistricts(data);
      }
    } catch (error) {
      console.error('Error cargando distritos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja la creación de un nuevo polígono
   */
  const handleCreated = async (e: any) => {
    const { layer } = e;
    const latLngs = layer.getLatLngs()[0]; // Obtener coordenadas del polígono

    // Convertir a formato de coordenadas
    const coordenadas = latLngs.map((latLng: any) => ({
      lat: latLng.lat,
      lng: latLng.lng,
    }));

    // Pedir nombre al usuario
    const nombre = prompt('Ingrese el nombre del distrito:');

    if (!nombre) {
      alert('Debe ingresar un nombre para el distrito');
      return;
    }

    // Guardar distrito en la API
    try {
      const response = await fetch('/api/districts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          coordenadas,
        }),
      });

      if (response.ok) {
        const newDistrict = await response.json();
        setDistricts([...districts, newDistrict]);
        alert(`Distrito "${nombre}" creado exitosamente!`);
      } else {
        alert('Error al guardar el distrito');
      }
    } catch (error) {
      console.error('Error guardando distrito:', error);
      alert('Error al guardar el distrito');
    }
  };

  if (isLoading || !isMounted) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p>Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={[-34.6037, -58.3816]} // Buenos Aires, Argentina (puedes cambiar esto)
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        preferCanvas={false}
      >
        {/* Capa de Tiles del mapa */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Control para dibujar */}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: {
                allowIntersection: false,
                showArea: true,
              },
            }}
          />
        </FeatureGroup>

        {/* Renderizar distritos guardados */}
        {districts.map((district) => (
          <Polygon
            key={district.id}
            positions={district.coordenadas.map((coord) => [coord.lat, coord.lng])}
            pathOptions={{
              color: district.color,
              fillColor: district.color,
              fillOpacity: 0.5,
            }}
          >
            {/* Tooltip que aparece al pasar el mouse */}
            <Tooltip permanent={false} direction="top">
              {district.nombre}
            </Tooltip>
            
            {/* Popup que aparece al hacer clic */}
            <Popup>
              <div>
                <h3 className="font-bold">{district.nombre}</h3>
                <p className="text-sm">Color: {district.color}</p>
                <p className="text-sm">ID: {district.id}</p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}
