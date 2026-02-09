# 📐 Arquitectura del Proyecto - Mapa de Distritos

## 🎯 Estructura de Carpetas Implementada

```
mapa-distritos/
│
├── app/                          # App Router de Next.js
│   ├── api/                      # Backend - Route Handlers
│   │   └── districts/
│   │       └── route.ts          # GET y POST /api/districts
│   ├── globals.css               # Estilos globales + CSS de Leaflet
│   ├── layout.tsx                # Layout raíz de la aplicación
│   └── page.tsx                  # Página principal (Home)
│
├── components/                   # Componentes de React
│   └── MapComponent.tsx          # Componente del mapa (use client)
│
├── data/                         # Almacenamiento de datos
│   └── districts.json            # Base de datos JSON de distritos
│
├── lib/                          # Lógica de negocio y utilidades
│   └── districts.ts              # CRUD de distritos, generadores
│
├── types/                        # Definiciones de TypeScript
│   └── district.ts               # Interfaces: District, Coordinate
│
└── public/                       # Archivos estáticos
```

---

## 🔄 Flujo de Datos

### 1. Crear un Distrito

```
Usuario dibuja polígono
       ↓
MapComponent captura coordenadas
       ↓
Prompt solicita nombre
       ↓
POST /api/districts
       ↓
Route Handler (route.ts)
       ↓
lib/districts.ts genera ID y color
       ↓
Escribe en data/districts.json
       ↓
Respuesta JSON con distrito creado
       ↓
MapComponent actualiza estado
       ↓
Mapa muestra nuevo distrito
```

### 2. Cargar Distritos

```
useEffect en MapComponent
       ↓
GET /api/districts
       ↓
Route Handler (route.ts)
       ↓
lib/districts.ts lee JSON
       ↓
Respuesta con array de distritos
       ↓
MapComponent renderiza Polygons
```

---

## 📦 Módulos y Responsabilidades

### **types/district.ts**
- Define las interfaces de datos
- `District`: Estructura de un distrito
- `Coordinate`: Par lat/lng

### **lib/districts.ts**
- `readDistricts()`: Lee el JSON de distritos
- `writeDistricts()`: Escribe en el JSON
- `generateDistrictId()`: Genera IDs únicos
- `generateRandomColor()`: Genera colores aleatorios

### **app/api/districts/route.ts**
- `GET`: Retorna todos los distritos
- `POST`: Crea un nuevo distrito con validación
- Manejo de errores con status codes apropiados

### **components/MapComponent.tsx**
- Componente "use client"
- Integra react-leaflet y react-leaflet-draw
- Gestiona estado local de distritos
- Maneja eventos de creación de polígonos
- Renderiza distritos en el mapa

### **app/page.tsx**
- Página principal del proyecto
- Importa MapComponent dinámicamente (SSR: false)
- Muestra instrucciones de uso

---

## 🧩 Tecnologías y Librerías

| Tecnología | Propósito |
|------------|-----------|
| **Next.js 16+** | Framework React con App Router |
| **TypeScript** | Type safety y mejor DX |
| **React Leaflet** | Componentes React para Leaflet |
| **Leaflet** | Librería de mapas interactivos |
| **Leaflet Draw** | Herramientas de dibujo en mapas |
| **Tailwind CSS** | Estilos utilitarios |

---

## 🔐 Validaciones Implementadas

### En el Backend (route.ts)
- ✅ Verifica que `nombre` exista
- ✅ Verifica que `coordenadas` sea un array
- ✅ Valida formato de coordenadas (lat, lng numéricos)
- ✅ Manejo de errores con try/catch

### En el Frontend (MapComponent.tsx)
- ✅ Solicita nombre al usuario (prompt)
- ✅ Verifica que el usuario ingrese un nombre
- ✅ Captura coordenadas del polígono automáticamente

---

## 🎨 Características de UX

1. **Loading States**
   - Mensaje mientras carga el mapa
   - Mensaje mientras carga distritos

2. **Feedback Visual**
   - Alerts de confirmación al crear distrito
   - Alerts de error si falla la creación
   - Popups informativos en cada distrito

3. **Instrucciones Claras**
   - Guía paso a paso en la interfaz
   - Textos descriptivos

4. **Diseño Responsivo**
   - Container adaptable
   - Mapa de altura fija pero ajustable

---

## 🚀 Mejoras Futuras Sugeridas

### Funcionalidad
- [ ] Editar distritos existentes
- [ ] Eliminar distritos
- [ ] Exportar/Importar distritos (JSON, GeoJSON)
- [ ] Búsqueda y filtrado de distritos
- [ ] Capa de calor basada en datos

### UX/UI
- [ ] Modal en lugar de prompt nativo
- [ ] Selector de colores manual
- [ ] Lista lateral con todos los distritos
- [ ] Zoom automático al distrito seleccionado

### Técnicas
- [ ] Base de datos real (PostgreSQL + PostGIS)
- [ ] Autenticación de usuarios
- [ ] API para múltiples capas de datos
- [ ] Tests unitarios y de integración
- [ ] Validación con Zod

### Performance
- [ ] Paginación de distritos
- [ ] Lazy loading de polígonos
- [ ] Caché de API con SWR o React Query
- [ ] Compresión de coordenadas

---

## 📊 Modelo de Datos

### District
```typescript
{
  id: string;           // Único, generado automáticamente
  nombre: string;       // Ingresado por el usuario
  color: string;        // Generado automáticamente (#RRGGBB)
  coordenadas: [        // Capturadas del dibujo
    { lat: number, lng: number },
    ...
  ]
}
```

### Almacenamiento (districts.json)
```json
[
  {
    "id": "district-1707523200000-abc123xyz",
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

---

## 🔧 Configuración Especial

### Dynamic Import del Mapa
```typescript
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,  // Evita errores de SSR (Leaflet usa 'window')
});
```

### Fix de Iconos de Leaflet
```typescript
// Necesario para que los iconos funcionen en Next.js
let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});
L.Marker.prototype.options.icon = DefaultIcon;
```

---

## 📝 Convenciones de Código

- **Nombres de archivos**: camelCase para componentes, kebab-case para utilidades
- **Componentes**: PascalCase
- **Funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE (cuando aplique)
- **Comentarios**: JSDoc para funciones principales
- **Idioma**: Español para UI y variables de negocio, inglés para código técnico

---

## ✅ Checklist de Implementación Completada

- [x] Instalación de dependencias
- [x] Creación de tipos TypeScript
- [x] Utilidades de lectura/escritura JSON
- [x] Endpoints API (GET y POST)
- [x] Componente de mapa con Leaflet
- [x] Integración de react-leaflet-draw
- [x] Página principal con instrucciones
- [x] Persistencia en JSON
- [x] Generación automática de IDs
- [x] Generación automática de colores
- [x] Renderizado de distritos guardados
- [x] Validaciones en backend
- [x] Manejo de errores
- [x] Documentación completa

---

**Proyecto completado y listo para usar** ✨
