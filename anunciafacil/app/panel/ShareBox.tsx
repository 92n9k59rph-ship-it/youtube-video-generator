"use client";

import { useState } from "react";

// Botones para recomendar Anuncio Fácil a otro negocio.
export function ShareBox({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const message = `¡Hola! Uso Anuncio Fácil para escribir las publicaciones de Instagram, respuestas a reseñas y mensajes de mi negocio en un minuto. Ahora es gratis por tiempo limitado, pruébalo: ${url}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="nav">
      <a className="btn btn-primary" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
        Enviar por WhatsApp
      </a>
      <button className="btn btn-ghost" type="button" onClick={copy}>
        {copied ? "Enlace copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
