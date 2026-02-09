# Mapa de Distritos

Aplicación full-stack con Next.js (App Router) para dibujar y gestionar distritos en un mapa interactivo.

## 🚀 Características

- ✅ Mapa interactivo con Leaflet
- ✅ Dibujo de polígonos para crear distritos
- ✅ Asignación automática de colores a cada distrito
- ✅ Persistencia de datos en archivo JSON
- ✅ API RESTful con Route Handlers de Next.js
- ✅ TypeScript para type-safety
- ✅ Componentes React modulares

## 📁 Estructura del Proyecto

```
mapa-distritos/
├── app/
│   ├── api/
│   │   └── districts/
│   │       └── route.ts          # Endpoints GET y POST para distritos
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal con el mapa
├── components/
│   └── MapComponent.tsx          # Componente del mapa con Leaflet
├── data/
│   └── districts.json            # Almacenamiento de distritos
├── lib/
│   └── districts.ts              # Utilidades para leer/escribir JSON
├── types/
│   └── district.ts               # Tipos de TypeScript
└── public/                       # Archivos estáticos
```

## 🛠️ Tecnologías Utilizadas

- **Next.js 16+** - Framework de React con App Router
- **TypeScript** - Type safety
- **React Leaflet** - Componentes de React para Leaflet
- **Leaflet Draw** - Herramientas de dibujo para mapas
- **Tailwind CSS** - Estilos

## 📦 Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <url-del-repo>
cd mapa-distritos

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📖 Uso

### Crear un Distrito

1. Haz clic en el ícono del polígono (⬟) en la barra de herramientas del mapa
2. Haz clic en el mapa para crear los vértices del polígono
3. Haz doble clic o cierra el polígono haciendo clic en el primer punto
4. Ingresa el nombre del distrito cuando se solicite
5. El distrito se guardará automáticamente con un color aleatorio

### Ver Distritos

- Los distritos guardados se muestran automáticamente en el mapa
- Haz clic en un distrito para ver su información en un popup

## 🔌 API Endpoints

### GET /api/districts
Obtiene todos los distritos guardados.

**Respuesta:**
```json
[
  {
    "id": "district-1234567890-abc123",
    "nombre": "Distrito Centro",
    "color": "#3B82F6",
    "coordenadas": [
      { "lat": -34.603, "lng": -58.381 },
      { "lat": -34.604, "lng": -58.382 },
      { "lat": -34.605, "lng": -58.380 }
    ]
  }
]
```

### POST /api/districts
Crea un nuevo distrito.

**Body:**
```json
{
  "nombre": "Distrito Norte",
  "coordenadas": [
    { "lat": -34.603, "lng": -58.381 },
    { "lat": -34.604, "lng": -58.382 },
    { "lat": -34.605, "lng": -58.380 }
  ]
}
```

**Respuesta:**
```json
{
  "id": "district-1234567890-xyz789",
  "nombre": "Distrito Norte",
  "color": "#8B5CF6",
  "coordenadas": [...]
}
```

## 📝 Tipos de Datos

### District
```typescript
interface District {
  id: string;
  nombre: string;
  color: string;
  coordenadas: Coordinate[];
}
```

### Coordinate
```typescript
interface Coordinate {
  lat: number;
  lng: number;
}
```

## 🎨 Personalización

### Cambiar la ubicación inicial del mapa

Edita el componente `MapComponent.tsx`:

```typescript
<MapContainer
  center={[-34.6037, -58.3816]} // Cambia estas coordenadas
  zoom={12}
  ...
>
```

### Cambiar el estilo del mapa

Puedes cambiar el proveedor de tiles en `MapComponent.tsx`:

```typescript
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // Prueba otros estilos como:
  // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios importantes antes de crear un pull request.

## 📄 Licencia

MIT
