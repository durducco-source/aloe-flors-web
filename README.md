# Aloe Flors · Web oficial

Web de **Aloe Flors**, floristería en Lloret de Mar (Girona).
Diseño y desarrollo: **DURDUC**.

- Web publicada: https://durducco-source.github.io/aloe-flors-web/
- Instagram del negocio: https://www.instagram.com/aloeflors/

Web estática hecha con **HTML, CSS y JavaScript** (sin dependencias ni compilación), lista para GitHub Pages.

---

## Estructura del proyecto

```
ALOE-FLORS-WEB/
├── index.html          → toda la página (textos, secciones, enlaces)
├── style.css           → diseño: colores, tipografías, animaciones, versión móvil
├── script.js           → interacciones (menú, galería, vídeos, formulario, horario)
├── 404.html            → página de error
├── robots.txt          → indicaciones para buscadores
├── sitemap.xml         → mapa del sitio para Google
├── site.webmanifest    → icono y colores al guardar la web en el móvil
├── .nojekyll           → indica a GitHub Pages que publique los archivos tal cual
└── assets/
    ├── images/         → fotografías (versión grande + versión "-sm" ligera)
    ├── videos/         → vídeos .mp4
    └── icons/          → logotipo SVG, favicon e icono para móviles
```

## Secciones de la página

1. **Portada** con el vídeo real de una ceremonia de boda (fondo desenfocado + marco, botón de sonido).
2. **Nosotros**: presentación del Flower Bar y los valores del negocio.
3. **Productos y servicios**: ramos, plantas, bodas, arcos florales, fechas especiales, envíos e Interflora.
4. **Manifiesto** con efecto parallax (frase de su propio Instagram).
5. **Composiciones destacadas**: carrusel arrastrable con visor a pantalla completa.
6. **El lenguaje de las flores amarillas** (contenido de su publicación de marzo).
7. **Bodas y eventos** con vídeo del arco floral.
8. **Galería** con filtros (Flores / Plantas / Eventos) y visor.
9. **Vídeos** con reproductor emergente con sonido.
10. **Opiniones** de clientes (extractos de reseñas públicas de Google).
11. **Instagram**, **Contacto** (horario con indicador "Abierto ahora"), **formulario que envía el pedido por WhatsApp** y **mapa**.
12. Botón flotante de **WhatsApp** en toda la página.

## Cómo editar

| Quiero cambiar…                    | Dónde                                                                 |
|------------------------------------|-----------------------------------------------------------------------|
| Un texto                           | `index.html` (cada sección está marcada con un comentario `<!-- ==== -->`) |
| El número de WhatsApp              | `script.js` → `CONFIG.whatsapp` **y** los textos visibles en `index.html` (busca `695`) |
| El horario                         | `index.html` (tabla `data-hours`) **y** `script.js` → `CONFIG.hours` (para el aviso "Abierto ahora") |
| Teléfono / dirección               | `index.html` (busca `972 37 07 01` o `Vidreres`) y el bloque `application/ld+json` del `<head>` |
| Colores o tipografías              | `style.css`, al principio, en `:root`                                 |
| Una foto                           | Sustituye el archivo en `assets/images/` manteniendo el mismo nombre (y su versión `-sm`) |
| Añadir una foto a la galería       | Copia una línea `<figure data-cat="flores" …>` de la sección Galería y cambia las rutas |
| Un vídeo                           | Sustituye el `.mp4` en `assets/videos/` y su imagen `-poster` en `assets/images/` |

Los mensajes de los botones de WhatsApp se editan en el atributo `data-wa="…"` de cada botón.

Para ver la web en tu ordenador basta con abrir `index.html` en el navegador
(el mapa de Google y las fuentes necesitan conexión a internet).

## Publicar cambios en GitHub Pages

Si editas los archivos en tu ordenador:

```bash
git add .
git commit -m "Actualizo textos"
git push
```

También puedes editar directamente en github.com (abre el archivo → icono del lápiz → *Commit changes*).
GitHub Pages actualiza la web en 1–2 minutos.

## Fuentes del contenido

Toda la información y el material visual proceden de fuentes públicas del propio negocio:

- **Fotos y vídeos**: publicaciones públicas de [@aloeflors](https://www.instagram.com/aloeflors/) en Instagram.
- **WhatsApp 695 67 01 20**: biografía de su Instagram.
- **Dirección (Ctra. de Vidreres, 115) y teléfono (972 37 07 01)**: fichas públicas del negocio
  (Interflora, Floristeriastop, directorios de empresas).
- **Horario**: fichas públicas del negocio. ⚠️ Las fuentes no coinciden del todo; **confirmar con el cliente antes de publicar definitivamente**.
- **Opiniones**: extractos breves de reseñas públicas de Google recopiladas por Floristeriastop.

El logotipo de la web es una recreación vectorial (SVG) a partir del logotipo de su perfil de Instagram.
Si el cliente dispone del logotipo original en vector, sustituir `assets/icons/logo.svg` y el símbolo `#logo-mark` de `index.html`.

## Rendimiento y SEO

- Imágenes optimizadas en dos tamaños (1600 px y 800 px) con carga diferida (`loading="lazy"`).
- El vídeo de fondo y el mapa sólo se cargan cuando hacen falta.
- Metadatos SEO, Open Graph (vista previa en WhatsApp/redes), datos estructurados `Florist` (schema.org),
  `sitemap.xml` y `robots.txt`.
- Respeta la preferencia del sistema "reducir movimiento".
- Navegable con teclado y lector de pantalla (textos alternativos, etiquetas ARIA).

---
© Aloe Flors · Lloret de Mar — Diseño web por DURDUC
