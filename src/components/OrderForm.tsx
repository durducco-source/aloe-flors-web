"use client";

// Formulario de pedido: valida nombre y mensaje y abre WhatsApp con el texto listo para enviar.
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Shot } from "./cinema";
import Icon from "./Icon";

export default function OrderForm() {
  const o = site.order;
  const sectionRef = useRef<HTMLElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // La fecha no puede ser anterior a hoy (se calcula en el navegador)
  useEffect(() => {
    const d = new Date();
    if (dateRef.current) dateRef.current.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  if (!o) return null;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    const name = String(data.get("nombre") ?? "").trim();
    const msg = String(data.get("mensaje") ?? "").trim();
    if (!name || !msg) {
      setError(true);
      (f.elements.namedItem(name ? "mensaje" : "nombre") as HTMLElement | null)?.focus();
      return;
    }
    setError(false);
    const raw = String(data.get("fecha") ?? "");
    const fecha = raw ? raw.split("-").reverse().join("/") : "";
    const lines = [
      `${o.greeting} ${name}.`,
      `Ocasión: ${data.get("ocasion")}`,
      fecha ? `Fecha: ${fecha}` : null,
      `Entrega: ${data.get("entrega")}`,
      "",
      msg,
    ].filter((l) => l !== null);
    window.open(`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  };

  const field = "w-full rounded-none border-0 border-b border-fg/25 bg-transparent px-0 py-3 text-[16px] text-fg placeholder:text-fg/40 focus:border-accent focus:outline-none";
  return (
    <section id={o.id} ref={sectionRef} aria-labelledby="pedido-titulo" className="relative overflow-hidden bg-deep py-[clamp(90px,12vw,160px)]">
      <motion.div style={{ y }} className="absolute inset-[-10%_0]">
        <Shot media={o.image} className="absolute inset-0 h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-deep/70" aria-hidden="true" />
      <div className="wrap relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 id="pedido-titulo" className="caption-title text-[clamp(38px,5vw,80px)] leading-none">{o.title}</h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/80">{o.intro}</p>
        </div>
        <form onSubmit={submit} noValidate className="flex flex-col gap-6 border border-fg/15 bg-deep/60 p-6 backdrop-blur-md sm:p-10">
          <label className="block">
            <span className="kicker text-fg/60">Nombre</span>
            <input name="nombre" type="text" autoComplete="given-name" required placeholder="Tu nombre" className={field} aria-invalid={error || undefined} />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="kicker text-fg/60">Ocasión</span>
              <select name="ocasion" className={`${field} [&>option]:bg-deep`}>
                {o.occasions.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="kicker text-fg/60">Fecha</span>
              <input ref={dateRef} name="fecha" type="date" className={`${field} [color-scheme:dark]`} />
            </label>
          </div>
          <fieldset>
            <legend className="kicker mb-3 text-fg/60">Entrega</legend>
            <div className="flex flex-wrap gap-3">
              {o.deliveries.map((d, i) => (
                <label key={d} className="cursor-pointer">
                  <input type="radio" name="entrega" value={d} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-fg/30 px-4 py-2 text-sm transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-deep peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-accent">{d}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="kicker text-fg/60">Cuéntanos qué te gustaría</span>
            <textarea name="mensaje" rows={3} required placeholder="Colores, presupuesto, flores favoritas…" className={`${field} resize-none`} aria-invalid={error || undefined} />
          </label>
          {error && <p role="alert" className="text-sm text-accent">Por favor, indica tu nombre y lo que te gustaría.</p>}
          <button type="submit" className="btn btn-solid justify-center">
            <Icon name="whatsapp" size={16} /> Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
