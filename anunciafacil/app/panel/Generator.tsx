"use client";

import { useState } from "react";
import type { ToolResult } from "@/lib/generator";
import { TOOLS, TOOL_IDS, type ToolId } from "@/lib/tools";
import type { Usage } from "@/lib/usage";

export function Generator({
  initialUsage,
  canGenerate,
  showPricing,
  lockedTools = [],
}: {
  initialUsage: Usage;
  canGenerate: boolean;
  showPricing: boolean;
  // Herramientas del plan Pro que este cliente (plan Básico) no puede usar.
  lockedTools?: ToolId[];
}) {
  const [tool, setTool] = useState<ToolId>("social");
  const [request, setRequest] = useState("");
  const [output, setOutput] = useState<ToolResult | null>(null);
  const [usage, setUsage] = useState(initialUsage);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const info = TOOLS[tool];
  const remaining = Math.max(0, usage.limit - usage.used);

  function chooseTool(next: ToolId) {
    setTool(next);
    setRequest("");
    setError("");
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, request }),
      });
      const data = await res.json().catch(() => ({ error: "Respuesta no válida del servidor." }));
      if (data.usage) setUsage(data.usage);
      if (!res.ok) {
        setError(data.error ?? "Algo ha fallado. Inténtalo de nuevo.");
        return;
      }
      setOutput(data.output);
    } catch {
      setError("No hay conexión. Comprueba internet e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <form className="panel" onSubmit={generate}>
        <h2>¿Qué necesitas hoy?</h2>
        <div className="tools" role="group" aria-label="Herramienta">
          {TOOL_IDS.map((id) => (
            <button
              key={id}
              id={`tool-${id}`}
              type="button"
              className="tool"
              aria-pressed={tool === id}
              onClick={() => chooseTool(id)}
            >
              <strong>
                {TOOLS[id].label}
                {TOOLS[id].proOnly && <span className="pro-badge">{lockedTools.includes(id) ? "🔒 Pro" : "Pro"}</span>}
              </strong>
              <span>{TOOLS[id].short}</span>
            </button>
          ))}
        </div>

        {lockedTools.includes(tool) && (
          <p className="notice notice-error">
            «{info.label}» está incluida en el plan Pro (200 generaciones al mes). Puedes cambiar de plan desde «Gestionar suscripción».
          </p>
        )}
        <label htmlFor="request">
          {info.inputLabel}
          <textarea
            id="request"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            maxLength={info.maxLength}
            placeholder={info.placeholder}
            required
          />
        </label>
        <div className="nav">
          {info.examples.map((ex) => (
            <button key={ex} type="button" className="btn btn-ghost small" onClick={() => setRequest(ex)}>
              {ex.length > 60 ? `${ex.slice(0, 57)}…` : ex}
            </button>
          ))}
        </div>

        <div className="stack" style={{ gap: 6 }}>
          <div className="meter" aria-hidden="true">
            <span style={{ width: `${Math.min(100, (usage.used / Math.max(1, usage.limit)) * 100)}%` }} />
          </div>
          <p className="muted small">
            {usage.period === "lanzamiento"
              ? showPricing
                ? `Gratis durante el lanzamiento: has usado ${usage.used} de ${usage.limit} generaciones este mes.`
                : `Has usado ${usage.used} de ${usage.limit} generaciones este mes.`
              : usage.period === "gratis"
              ? usage.limit === 0
                ? "Suscríbete para empezar a generar textos."
                : `Te quedan ${remaining} de ${usage.limit} generaciones gratis.`
              : `Has usado ${usage.used} de ${usage.limit} generaciones este mes.`}{" "}
            Cada vez que pulsas «Generar» cuenta como una, sea cual sea la herramienta.
          </p>
        </div>
        {error && <p className="notice notice-error">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={loading || !canGenerate || remaining === 0 || lockedTools.includes(tool)}>
          {loading ? "Escribiendo… (unos segundos)" : "Generar"}
        </button>
      </form>

      {output && <Results output={output} />}
    </div>
  );
}

export function Results({ output }: { output: ToolResult }) {
  switch (output.tool) {
    case "social":
      return <SocialResult result={output.result} />;
    case "email":
      return <EmailResult result={output.result} />;
    case "review":
      return <ReviewResult result={output.result} />;
    case "whatsapp":
      return <WhatsappResult result={output.result} />;
    case "poster":
      return <PosterResult result={output.result} />;
    case "reply":
      return <ReplyResult result={output.result} />;
  }
}

type ResultOf<T extends ToolId> = Extract<ToolResult, { tool: T }>["result"];

function SocialResult({ result }: { result: ResultOf<"social"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="card-head">
          <h2>Publicaciones</h2>
          <CopyButton
            text={result.posts.map((post) => `${post.title}\n\n${post.caption}\n\n${post.hashtags.join(" ")}`).join("\n\n———\n\n")}
            idle="Copiar todas"
          />
        </div>
        <div className="grid-3">
          {result.posts.map((post, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{post.title}</span>
                <CopyButton text={`${post.caption}\n\n${post.hashtags.join(" ")}`} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{post.caption}</p>
              <p className="hashtags">{post.hashtags.join(" ")}</p>
              <p className="muted small">📷 {post.image_idea}</p>
              <p className="muted small">🗓️ {post.best_day}</p>
            </article>
          ))}
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

      <Tips title="Consejos" items={result.tips} />
    </div>
  );
}

function EmailResult({ result }: { result: ResultOf<"email"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Asunto</h2>
        <div className="stack" style={{ gap: 8 }}>
          {result.subjects.map((subject, i) => (
            <div className="card card-row" key={i}>
              <span>{subject}</span>
              <CopyButton text={subject} />
            </div>
          ))}
        </div>
        <p className="muted small">Texto de vista previa: {result.preview_text}</p>
      </section>
      <section className="panel">
        <div className="card-head">
          <h2>Correo</h2>
          <CopyButton text={result.body} />
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{result.body}</p>
        <p><strong>Llamada a la acción:</strong> {result.call_to_action}</p>
      </section>
      <Tips title="Antes de enviarlo" items={result.tips} />
    </div>
  );
}

function ReviewResult({ result }: { result: ResultOf<"review"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="card-head">
          <h2>Respuestas para la reseña</h2>
          <span className="pill">Reseña {result.sentiment}</span>
        </div>
        <div className="grid-3">
          {result.replies.map((reply, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{reply.style}</span>
                <CopyButton text={reply.text} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{reply.text}</p>
            </article>
          ))}
        </div>
        <p className="muted">💡 {result.advice}</p>
      </section>
    </div>
  );
}

function ReplyResult({ result }: { result: ResultOf<"reply"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Respuestas para tu cliente</h2>
        <p className="muted">🗨️ {result.summary}</p>
        <div className="grid-3">
          {result.replies.map((reply, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{reply.style}</span>
                <CopyButton text={reply.text} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{reply.text}</p>
            </article>
          ))}
        </div>
      </section>
      <Tips title="Antes de enviarla" items={result.next_steps} />
    </div>
  );
}

function WhatsappResult({ result }: { result: ResultOf<"whatsapp"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Mensajes de WhatsApp</h2>
        <div className="grid-3">
          {result.messages.map((message, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{message.style}</span>
                <CopyButton text={message.text} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{message.text}</p>
            </article>
          ))}
        </div>
      </section>
      <Tips title="Antes de enviarlo" items={result.tips} />
    </div>
  );
}

function PosterResult({ result }: { result: ResultOf<"poster"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Propuestas</h2>
        <div className="grid-3">
          {result.options.map((option, i) => {
            const text = [option.headline, option.subheadline, ...option.details, option.call_to_action].join("\n");
            return (
              <article className="card poster" key={i}>
                <div className="card-head">
                  <span className="card-label">Opción {i + 1}</span>
                  <CopyButton text={text} />
                </div>
                <h3 className="poster-headline">{option.headline}</h3>
                <p className="muted">{option.subheadline}</p>
                <ul>
                  {option.details.map((detail, j) => (
                    <li key={j}>{detail}</li>
                  ))}
                </ul>
                <p><strong>{option.call_to_action}</strong></p>
              </article>
            );
          })}
        </div>
      </section>
      <Tips title="Consejos de diseño" items={result.design_tips} />
    </div>
  );
}

function Tips({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="panel">
      <h2>{title}</h2>
      <ul>
        {items.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}

function CopyButton({ text, idle = "Copiar" }: { text: string; idle?: string }) {
  const [label, setLabel] = useState(idle);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copiado");
    } catch {
      setLabel("Mantén pulsado el texto para copiarlo");
    }
    setTimeout(() => setLabel(idle), 2000);
  }
  return (
    <button type="button" className="copy" onClick={copy}>
      {label}
    </button>
  );
}
