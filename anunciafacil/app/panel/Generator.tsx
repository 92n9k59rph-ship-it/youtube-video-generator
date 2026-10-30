"use client";

import { useState } from "react";
import type { GenerationResult } from "@/lib/generator";
import type { Usage } from "@/lib/usage";

const EXAMPLES = [
  "Esta semana tenemos 2x1 en cafés por las mañanas",
  "Ideas para publicar este mes",
  "Abrimos el domingo por la tarde por primera vez",
];

export function Generator({ initialUsage, canGenerate }: { initialUsage: Usage; canGenerate: boolean }) {
  const [request, setRequest] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [usage, setUsage] = useState(initialUsage);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const remaining = Math.max(0, usage.limit - usage.used);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request }),
      });
      const data = await res.json().catch(() => ({ error: "Respuesta no válida del servidor." }));
      if (data.usage) setUsage(data.usage);
      if (!res.ok) {
        setError(data.error ?? "Algo ha fallado. Inténtalo de nuevo.");
        return;
      }
      setResult(data.result);
    } catch {
      setError("No hay conexión. Comprueba internet e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <form className="panel" onSubmit={generate}>
        <h2>¿Qué quieres anunciar?</h2>
        <div className="stack" style={{ gap: 6 }}>
          <div className="meter" aria-hidden="true">
            <span style={{ width: `${Math.min(100, (usage.used / Math.max(1, usage.limit)) * 100)}%` }} />
          </div>
          <p className="muted small">
            {usage.period === "gratis"
              ? `Te quedan ${remaining} de ${usage.limit} generaciones gratis.`
              : `Has usado ${usage.used} de ${usage.limit} generaciones este mes.`}
          </p>
        </div>
        <label htmlFor="request">
          Cuéntalo con tus palabras
          <textarea
            id="request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            maxLength={600}
            placeholder={EXAMPLES[0]}
            required
          />
        </label>
        <div className="nav">
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" className="btn btn-ghost small" onClick={() => setRequest(ex)}>
              {ex}
            </button>
          ))}
        </div>
        {error && <p className="notice notice-error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading || !canGenerate || remaining === 0}>
          {loading ? "Escribiendo… (unos segundos)" : "Generar"}
        </button>
      </form>

      {result && <Results result={result} />}
    </div>
  );
}

function Results({ result }: { result: GenerationResult }) {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Publicaciones</h2>
        <div className="grid-3">
          {result.posts.map((post, i) => {
            const text = `${post.caption}\n\n${post.hashtags.join(" ")}`;
            return (
              <article className="card" key={i}>
                <div className="card-head">
                  <span className="card-label">{post.title}</span>
                  <CopyButton text={text} />
                </div>
                <p style={{ whiteSpace: "pre-wrap" }}>{post.caption}</p>
                <p className="hashtags">{post.hashtags.join(" ")}</p>
                <p className="muted small">📷 {post.image_idea}</p>
                <p className="muted small">🗓️ {post.best_day}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid-2">
        <div className="panel">
          <div className="card-head">
            <h2>Idea de Reel</h2>
            <span className="pill">{result.reel.duration_seconds} s</span>
          </div>
          <p><strong>Gancho:</strong> {result.reel.hook}</p>
          <ol>
            {result.reel.shots.map((shot, i) => (
              <li key={i}>{shot}</li>
            ))}
          </ol>
          <p><strong>Texto en pantalla:</strong> {result.reel.on_screen_text}</p>
          <p className="muted small">🎵 {result.reel.music_mood}</p>
        </div>
        <div className="panel">
          <h2>Calendario del mes</h2>
          <ul className="history">
            {result.calendar.map((item, i) => (
              <li key={i}>
                <strong style={{ whiteSpace: "nowrap" }}>{item.when}</strong>
                <span style={{ textAlign: "right" }}>{item.idea}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {result.tips.length > 0 && (
        <section className="panel">
          <h2>Consejos</h2>
          <ul>
            {result.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState("Copiar");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copiado");
    } catch {
      setLabel("Mantén pulsado el texto para copiarlo");
    }
    setTimeout(() => setLabel("Copiar"), 2000);
  }
  return (
    <button type="button" className="copy" onClick={copy}>
      {label}
    </button>
  );
}
