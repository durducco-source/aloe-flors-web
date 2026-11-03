# Aloe Flors · Floristería en Lloret de Mar

Web de **Aloe Flors**, floristería en Lloret de Mar (Ctra. de Vidreres, 115): ramos de flor fresca, plantas y composiciones, bodas y eventos, envíos a domicilio e Interflora.

Toda la web es **un único recorrido cinematográfico ligado al scroll** (inspirado en el Reel de referencia):
las fotografías y los vídeos son los protagonistas y el texto se reduce a una palabra por capítulo, una frase y los datos útiles.
Dirección creativa, diseño y desarrollo: **DURDUC**.

- Web publicada: https://durducco-source.github.io/aloe-flors-web/
- Código: https://github.com/durducco-source/aloe-flors-web
- Versión anterior conservada en la etiqueta git `v1-antes-recorrido`.

## El recorrido

| Escena | Movimiento de cámara |
|---|---|
| Inicio | Vídeo del ramo con avance; «ALOE FLORS» se abre; fundido a los tulipanes, «Regalar felicidad» |
| 01 Ramos | Retroceso desde los ranúnculos; deriva a los tulipanes |
| 02 Plantas | Puerta corredera y travelling por las composiciones |
| 03 Bodas | Vídeos verticales de la ceremonia y el arco floral |
| 04 Amarillo | Panorámica vertical del girasol; avance a las flores amarillas |
| 05 Galería | Tira de película con visor |
| 06 Contacto | La cámara se aleja; pedido, llamar, cómo llegar y horario |
| Pedido | Formulario que abre WhatsApp con el mensaje listo (nombre, ocasión, fecha, entrega y mensaje) |

## Tecnologías

Next.js 16 (App Router, exportación estática) · React 19 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion).

## Ejecutar en local

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # web estática en out/
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run deploy     # compila y publica en GitHub Pages (rama gh-pages)
```

## Cómo editar

Todo el guion está en `src/content/site.ts`: cada escena tiene un `kind` (movimiento de cámara), sus imágenes/vídeos y textos.
Tipos disponibles: `arrival` (llegada), `dive` (picado), `door` (puerta corredera + travelling), `pullback` (retroceso),
`depth` (capas de profundidad), `tilt` (panorámica vertical), `reel` (vídeos verticales), `list` (carta), `strip` (tira con visor) y `finale`.
Colores en `src/app/globals.css` y tipografías en `src/app/layout.tsx`.

```
src/
├── app/              → layout (SEO, fuentes, JSON-LD), página y tema
├── components/
│   ├── cinema.tsx    → primitivas: Scene, Shot (imagen/vídeo con cámara), ChapterWord, Caption, useRange
│   ├── scenes.tsx    → los 10 tipos de escena y el pie
│   ├── Header.tsx    → barra fina, menú a pantalla completa y barra de acción móvil
│   └── Hud.tsx       → capítulo actual y progreso
├── content/          → site.ts (guion y contenido) y types.ts (modelo)
└── lib/              → utilidades (fullRange para animaciones de scroll) y capítulos
```

## Fuentes del contenido

- Material de Aloe Flors (Instagram @aloeflors): fotos, vídeos y textos. Ficha pública: dirección, teléfonos y horario.
- La versión estática anterior está en la etiqueta `v1-antes-recorrido`.
