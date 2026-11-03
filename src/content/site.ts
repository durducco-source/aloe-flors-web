import type { Media, SiteContent } from "./types";

// Contenido verificado en Instagram @aloeflors y en su ficha pública (dirección, teléfonos, horario y reseñas).
// Fotos y vídeos: material de Aloe Flors. No se ha inventado información.
const WA_NUM = "34695670120";
const WA = `https://wa.me/${WA_NUM}?text=${encodeURIComponent("Hola Aloe Flors, me gustaría hacer un pedido.")}`;
const PHONE = "+34972370701";
const URL = "https://durducco-source.github.io/aloe-flors-web/";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Aloe+Flors+Ctra.+de+Vidreres+115+17310+Lloret+de+Mar";
const IG = "https://www.instagram.com/aloeflors/";

const v = (name: string, alt: string, poster: string): Media => ({ type: "video", src: `/media/${name}.mp4`, poster: `/media/${poster}.jpg`, alt });
const im = (name: string, alt: string): Media => ({ src: `/media/${name}.jpg`, sm: `/media/${name}-sm.jpg`, alt });

const pedir = { label: "Pedir por WhatsApp", href: WA, external: true };

export const site: SiteContent = {
  lang: "es",
  brand: { name: "Aloe Flors", top: "Lloret de Mar", sub: "Floristería" },
  seo: {
    title: "Aloe Flors · Floristería en Lloret de Mar | Ramos, plantas, bodas y eventos",
    description:
      "Aloe Flors, floristería en Lloret de Mar (Ctra. de Vidreres, 115). Ramos de flor fresca, plantas y composiciones, decoración floral para bodas y eventos, envíos a domicilio e Interflora. Pide por WhatsApp.",
    url: URL,
    image: `${URL}media/og-aloe-flors.jpg`,
    keywords: ["floristería Lloret de Mar", "flores Lloret de Mar", "ramos de flores Lloret", "arco floral boda Costa Brava", "Interflora Lloret de Mar", "Aloe Flors"],
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: "Aloe Flors",
    alternateName: "Flors i Plantes Aloe",
    url: URL,
    telephone: PHONE,
    address: { "@type": "PostalAddress", streetAddress: "Ctra. de Vidreres, 115", addressLocality: "Lloret de Mar", postalCode: "17310", addressRegion: "Girona", addressCountry: "ES" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "13:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "17:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:30", closes: "13:00" },
    ],
    sameAs: [IG],
    areaServed: "Lloret de Mar",
  },
  primary: { label: "Pedir", href: "#pedir", icon: "whatsapp" },
  phone: PHONE,

  scenes: [
    {
      kind: "arrival", id: "inicio", n: "00", label: "Inicio",
      a: v("portada-flores", "Ramo de flores de Aloe Flors", "portada-flores-poster"),
      b: im("tulipanes-lila", "Ramo de tulipanes lila"),
      kicker: "Floristería · Lloret de Mar", title: "Aloe Flors", sub: "Flores que dicen lo que sientes", enter: "Regalar felicidad",
    },
    {
      kind: "pullback", id: "ramos", n: "01", label: "Ramos",
      a: im("ranunculos-amarillos", "Ramo de ranúnculos amarillos"), origin: "50% 45%",
      b: im("tulipanes-lila-detalle", "Detalle de tulipanes lila"),
      title: "Ramos de flor fresca", sub: "Con flor de temporada, preparados al momento y con el color que elijas.", cta: pedir,
    },
    {
      kind: "door", id: "plantas", n: "02", label: "Plantas",
      door: im("composicion-13", "Monstera variegata en macetero de cuerda"),
      track: [
        im("composicion-01", "Cesta de kalanchoe, espatifilo y fitonia"), im("composicion-03", "Orquídea lila y kalanchoe"),
        im("composicion-05", "Orquídea blanca"), im("composicion-07", "Calas blancas"), im("composicion-09", "Cala amarilla"), im("composicion-11", "Palmeras y kalanchoe"),
      ],
      title: "Plantas y composiciones", sub: "Plantas vivas, cestas y orquídeas pensadas para durar.",
    },
    {
      kind: "reel", id: "eventos", n: "03", label: "Bodas",
      videos: [v("boda-ceremonia", "Ceremonia de boda decorada por Aloe Flors", "boda-ceremonia-poster"), v("arco-floral", "Arco floral", "arco-floral-poster")],
      title: "Arcos florales para cada ocasión", sub: "Decoración floral para ceremonias y eventos, adaptada a tu estilo, colores y temática.",
      cta: { label: "Consultar sin compromiso", href: WA, external: true },
    },
    {
      kind: "tilt", id: "amarillo", n: "04", label: "Amarillo",
      a: im("girasol", "Girasol"),
      b: im("flores-amarillas", "Flores amarillas"),
      title: "Girasol: alegría y energía", title2: "Flores amarillas: luz y nuevos comienzos",
    },
    {
      kind: "strip", id: "galeria", n: "05", label: "Galería",
      items: [
        im("rosa-amarilla", "Rosa amarilla: amistad y gratitud"), im("composicion-02", "Dracaena y kalanchoe"), im("gerberas-amarillas", "Gerberas: felicidad"),
        im("composicion-04", "Cala morada con lazo"), im("orquidea-amarilla", "Orquídea amarilla"), im("composicion-06", "Carretilla con rosas"),
        im("clavel-amarillo", "Clavel amarillo"), im("composicion-10", "Bromelia roja"), im("composicion-12", "Monstera variegata"),
      ],
    },
    {
      kind: "finale", id: "contacto", n: "06", label: "Contacto",
      a: im("composicion-08", "Kalanchoe rosa y hiedra"),
      title: "Cada flor *regala felicidad*",
      note: "Hacemos envíos a domicilio y somos punto Interflora.",
      ctas: [{ label: "Hacer un pedido", href: "#pedir" }, { label: "Llamar", href: `tel:${PHONE}` }, { label: "Cómo llegar", href: MAPS, external: true }],
      info: [
        { label: "Dirección", value: "Ctra. de Vidreres, 115 · Lloret de Mar", href: MAPS },
        { label: "Horario", value: "Mar–vie 9:30–13 · 17–20 h · Sáb 9:30–13 h" },
      ],
    },
  ],

  order: {
    id: "pedir",
    title: "Encarga por WhatsApp",
    intro: "Rellena los datos y se abrirá WhatsApp con tu mensaje listo para enviar. En festivos y fechas señaladas, confírmanos tu pedido por WhatsApp.",
    whatsapp: WA_NUM,
    greeting: "Hola Aloe Flors, soy",
    occasions: ["Ramo o detalle", "Cumpleaños", "Aniversario / amor", "Nacimiento", "Planta o composición", "Boda", "Evento", "Condolencias", "Envío Interflora", "Otra"],
    deliveries: ["Recogida en tienda", "Envío a domicilio"],
    image: im("primavera-poster", "Primavera en la tienda de Aloe Flors"),
  },

  footer: {
    address: { label: "Ctra. de Vidreres, 115 · 17310 Lloret de Mar", href: MAPS },
    contacts: [{ label: "WhatsApp 695 67 01 20", href: WA }, { label: "Teléfono 972 37 07 01", href: `tel:${PHONE}` }],
    hours: [
      { day: "Lunes", value: "Cerrado" },
      { day: "Martes a viernes", value: "9:30–13 · 17–20 h" },
      { day: "Sábado", value: "9:30–13 h" },
      { day: "Domingo", value: "Cerrado" },
    ],
    socials: [{ label: "Instagram", href: IG }, { label: "WhatsApp", href: WA }],
    sources: "Fotos y vídeos: Aloe Flors (@aloeflors)",
    line: "© 2026 Aloe Flors · Lloret de Mar",
  },
};
