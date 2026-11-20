# SECA · Ministerio de Adolescentes

Sitio web (una sola página) del Ministerio de Adolescentes de la **Iglesia Evangélica Peruana San Martín** – Cayma, Arequipa. *Living for Christ.*

Hecho con **React + Vite**, CSS Modules y `react-icons`.

## Comandos

```bash
npm install          # instalar dependencias (solo la primera vez)
npm run dev          # ver la web en desarrollo → http://localhost:5173
npm run build        # generar la versión final en la carpeta dist/
npm run preview      # ver la versión final localmente
npm run lint         # revisar el código
npm run check:data   # validar el contenido de src/data/
```

## ¿Dónde edito el contenido?

Todo el texto e imágenes están en **`src/data/`**. No hace falta tocar componentes.

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, lema, menú, horario, dirección, mapa, redes, textos de "Únete" | `src/data/site.js` |
| Misión, visión, objetivo general | `src/data/identidad.js` |
| Áreas (objetivos y actividades planificadas) | `src/data/areas.js` |
| Integrantes del equipo (y sus fotos) | `src/data/equipo.js` |
| Actividades del cronograma y su estado | `src/data/actividades.js` |
| Fotos de la galería | `src/data/galeria.js` |
| Colores, tipografías, espacios | `src/styles/tokens.css` |

Las imágenes van en `public/img/` y se referencian como `'/img/archivo.webp'`.

Después de editar datos, ejecuta `npm run check:data` para verificar que no haya errores (ids repetidos, áreas o personas inexistentes, fotos que no existen).

### Ejemplos rápidos

- **Marcar una actividad como realizada:** en `actividades.js` cambia `estado: 'no-realizado'` por `estado: 'realizado'`. Los contadores se actualizan solos.
- **Agregar una foto a la galería:** copia la foto a `public/img/` y añade en `galeria.js`:
  `{ id: 'ebdv', src: '/img/ebdv.webp', alt: 'Niños en la EBDV', titulo: 'EBDV 2026', layout: 'wide' }`
- **Poner la foto de un líder:** guarda `public/img/equipo/nayda.webp` y en `equipo.js` pon `foto: '/img/equipo/nayda.webp'`.
- **Mostrar redes sociales:** en `site.js` completa la `url` de cada red en `socials` (las vacías no se muestran). Si pones WhatsApp aparece también el botón "Escríbenos".

## Estructura

```
src/
  data/                 contenido del sitio
  styles/               tokens (colores, fuentes…) y estilos globales
  components/
    ui/                 piezas reutilizables (Button, Card, Modal, Carousel, Lightbox, Reveal…)
    layout/             Header, Footer, Layout
    sections/           secciones de la página (Hero, About, Areas, Plan, Team, Gallery, Contact)
  hooks/                useScrolled, useActiveSection, useCountUp, useInView
  pages/Home.jsx        une los datos con las secciones
```

## Publicar

`npm run build` genera la carpeta `dist/`, que se puede subir a Netlify, Vercel o GitHub Pages.
Después de publicar, actualiza en `index.html` la etiqueta `og:image` con la dirección completa del sitio
(ej. `https://tu-dominio.com/img/grupal.webp`) para que la vista previa al compartir por WhatsApp muestre la foto.
