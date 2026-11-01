"use client";

import { useEffect, useRef, useState } from "react";
import type { ToolResult } from "@/lib/generator";
import { PLANS, planLimit } from "@/lib/plans";
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
  // Herramientas de planes superiores que este cliente no puede usar con su plan.
  lockedTools?: ToolId[];
}) {
  const [tool, setTool] = useState<ToolId>("social");
  const [request, setRequest] = useState("");
  const [output, setOutput] = useState<ToolResult | null>(null);
  const [usage, setUsage] = useState(initialUsage);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const info = TOOLS[tool];
  const remaining = Math.max(0, usage.limit - usage.used);
  const blocked = loading || !canGenerate || remaining === 0 || lockedTools.includes(tool);

  // Borrador: lo que se está escribiendo se guarda en este dispositivo, por herramienta,
  // para no perderlo si se cierra la página. Si el navegador no deja guardar, no pasa nada.
  useEffect(() => {
    setRequest(readDraft(tool));
  }, [tool]);
  useEffect(() => {
    writeDraft(tool, request);
  }, [tool, request]);

  function chooseTool(next: ToolId) {
    setTool(next);
    setError("");
  }

  async function generate(e?: React.FormEvent) {
    e?.preventDefault();
    if (blocked || request.trim().length < 5) return;
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
      writeDraft(tool, "");
      // Lleva a los resultados, sobre todo en el móvil, donde quedan por debajo.
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
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
                {TOOLS[id].minPlan !== "basic" && (
                  <span className={`pro-badge ${TOOLS[id].minPlan === "premium" ? "premium-badge" : ""}`}>
                    {lockedTools.includes(id) ? "🔒 " : ""}
                    {PLANS[TOOLS[id].minPlan].name}
                  </span>
                )}
              </strong>
              <span>{TOOLS[id].short}</span>
            </button>
          ))}
        </div>

        {lockedTools.includes(tool) && (
          <p className="notice notice-error">
            «{info.label}» está incluida en el plan {PLANS[info.minPlan].name} ({PLANS[info.minPlan].priceLabel} al mes,{" "}
            {planLimit(info.minPlan)} generaciones). Puedes cambiar de plan desde «Gestionar suscripción».
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
        <button className="btn btn-primary" type="submit" disabled={blocked}>
          {loading ? "Escribiendo… (unos segundos)" : "Generar"}
        </button>
      </form>

      {output && (
        <div className="stack" ref={resultsRef} style={{ scrollMarginTop: 16 }}>
          <Results output={output} />
          <div className="panel card-row" style={{ flexWrap: "wrap" }}>
            <span className="muted small">¿No te convence? Pide otra versión (cuenta como una generación) o cambia lo que has escrito.</span>
            <span className="nav">
              <button className="btn btn-ghost" type="button" onClick={() => generate()} disabled={blocked}>
                {loading ? "Escribiendo…" : "Otra versión"}
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => document.getElementById("request")?.focus({ preventScroll: false })}
              >
                Cambiar la petición
              </button>
            </span>
          </div>
        </div>
      )}
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
    case "bio":
      return <BioResult result={output.result} />;
    case "google":
      return <GoogleResult result={output.result} />;
    case "promo":
      return <PromoResult result={output.result} />;
    case "reel":
      return <ReelResult result={output.result} />;
    case "loyalty":
      return <LoyaltyResult result={output.result} />;
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

function BioResult({ result }: { result: ResultOf<"bio"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="card-head">
          <h2>Nombre del perfil</h2>
          <CopyButton text={result.profile_name} />
        </div>
        <p><strong>{result.profile_name}</strong></p>
      </section>
      <section className="panel">
        <h2>Biografías</h2>
        <div className="grid-3">
          {result.bios.map((bio, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{bio.style}</span>
                <CopyButton text={bio.text} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{bio.text}</p>
              <p className="muted small">{bio.text.length} caracteres</p>
            </article>
          ))}
        </div>
      </section>
      <section className="grid-2">
        <div className="panel">
          <h2>Historias destacadas</h2>
          <div className="nav">
            {result.highlights.map((h, i) => (
              <span className="pill" key={i}>{h}</span>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="card-head">
            <h2>Botón o enlace</h2>
            <CopyButton text={result.link_text} />
          </div>
          <p>{result.link_text}</p>
        </div>
      </section>
      <Tips title="Consejos" items={result.tips} />
    </div>
  );
}

function GoogleResult({ result }: { result: ResultOf<"google"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="card-head">
          <h2>Descripción de tu ficha</h2>
          <CopyButton text={result.description} />
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{result.description}</p>
        <p className="muted small">
          {result.description.length} de 750 caracteres · Pégala en Google Business Profile → Editar perfil → Descripción.
        </p>
      </section>
      <section className="panel">
        <h2>Así te buscan tus clientes</h2>
        <p className="muted small">Usa estas palabras, sin repetirlas a la fuerza, en tu descripción, tus publicaciones y tus respuestas.</p>
        <div className="nav">
          {result.keywords.map((k, i) => (
            <span className="pill" key={i}>🔎 {k}</span>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>Publicaciones para tu ficha</h2>
        <div className="grid-3">
          {result.posts.map((post, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{post.kind}</span>
                <CopyButton text={`${post.title}\n\n${post.text}`} />
              </div>
              <strong>{post.title}</strong>
              <p style={{ whiteSpace: "pre-wrap" }}>{post.text}</p>
              <p className="muted small">Botón: {post.button}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="card-head">
          <h2>Preguntas frecuentes</h2>
          <CopyButton text={result.faqs.map((f) => `${f.question}\n${f.answer}`).join("\n\n")} idle="Copiar todas" />
        </div>
        <div className="faq">
          {result.faqs.map((f, i) => (
            <details key={i}>
              <summary>{f.question}</summary>
              <p className="muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <Tips title="Para salir más arriba en Google Maps" items={result.tips} />
    </div>
  );
}

function PromoResult({ result }: { result: ResultOf<"promo"> }) {
  const posterText = [result.poster.headline, result.poster.subheadline, result.poster.call_to_action].join("\n");
  return (
    <div className="stack">
      <section className="panel">
        <span className="tag">Campaña</span>
        <h2 style={{ marginTop: 10 }}>{result.name}</h2>
        <p><strong>{result.key_message}</strong></p>
        <p className="muted" style={{ whiteSpace: "pre-wrap" }}>{result.offer}</p>
      </section>
      <section className="panel">
        <h2>Plan de 2 semanas</h2>
        <ul className="history">
          {result.plan.map((step, i) => (
            <li key={i}>
              <strong style={{ whiteSpace: "nowrap" }}>{step.day}</strong>
              <span style={{ textAlign: "right" }}>
                <span className="pill">{step.channel}</span> {step.action}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="panel">
        <h2>Publicaciones</h2>
        <div className="grid-3">
          {result.social_posts.map((post, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">Publicación {i + 1}</span>
                <CopyButton text={`${post.caption}\n\n${post.hashtags.join(" ")}`} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{post.caption}</p>
              <p className="hashtags">{post.hashtags.join(" ")}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="grid-2">
        <div className="panel">
          <div className="card-head">
            <h2>Correo</h2>
            <CopyButton text={`${result.email.subject}\n\n${result.email.body}`} />
          </div>
          <p><strong>{result.email.subject}</strong></p>
          <p style={{ whiteSpace: "pre-wrap" }}>{result.email.body}</p>
        </div>
        <div className="stack">
          <div className="panel">
            <div className="card-head">
              <h2>WhatsApp</h2>
              <CopyButton text={result.whatsapp} />
            </div>
            <p style={{ whiteSpace: "pre-wrap" }}>{result.whatsapp}</p>
          </div>
          <div className="panel poster">
            <div className="card-head">
              <h2>Cartel</h2>
              <CopyButton text={posterText} />
            </div>
            <h3 className="poster-headline">{result.poster.headline}</h3>
            <p className="muted">{result.poster.subheadline}</p>
            <p><strong>{result.poster.call_to_action}</strong></p>
          </div>
        </div>
      </section>
      <Tips title="Cómo saber si ha funcionado" items={result.measure} />
    </div>
  );
}

function ReelResult({ result }: { result: ResultOf<"reel"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="card-head">
          <h2>{result.title}</h2>
          <span className="pill">{result.duration_seconds} s</span>
        </div>
        <h3 style={{ fontSize: "1.05rem" }}>Ganchos para el primer segundo</h3>
        <ol>
          {result.hooks.map((hook, i) => (
            <li key={i}>{hook}</li>
          ))}
        </ol>
      </section>
      <section className="panel">
        <h2>Guion plano a plano</h2>
        <div className="stack" style={{ gap: 10 }}>
          {result.shots.map((shot, i) => (
            <article className="card" key={i}>
              <span className="card-label">{shot.seconds}</span>
              <p>🎥 {shot.visual}</p>
              {shot.voice && <p>🗣️ {shot.voice}</p>}
              {shot.on_screen_text && <p className="muted small">Texto en pantalla: {shot.on_screen_text}</p>}
            </article>
          ))}
        </div>
      </section>
      <section className="grid-2">
        <div className="panel">
          <div className="card-head">
            <h2>Subtítulos</h2>
            <CopyButton text={result.subtitles} />
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{result.subtitles}</p>
        </div>
        <div className="panel">
          <div className="card-head">
            <h2>Publicación</h2>
            <CopyButton text={`${result.caption}\n\n${result.hashtags.join(" ")}`} />
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{result.caption}</p>
          <p className="hashtags">{result.hashtags.join(" ")}</p>
          <p className="muted small">🖼️ Portada: «{result.cover_text}» · 🎵 {result.music_mood}</p>
        </div>
      </section>
      <Tips title="Consejos de grabación" items={result.tips} />
    </div>
  );
}

function LoyaltyResult({ result }: { result: ResultOf<"loyalty"> }) {
  return (
    <div className="stack">
      <section className="panel">
        <h2>Ideas para que vuelvan</h2>
        <div className="grid-3">
          {result.ideas.map((idea, i) => (
            <article className="card" key={i}>
              <span className="card-label">{idea.name}</span>
              <p>{idea.how}</p>
              <p className="small">👍 {idea.pros}</p>
              <p className="small">👎 {idea.cons}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="card-head">
          <h2>Normas</h2>
          <CopyButton text={result.rules.map((r, i) => `${i + 1}. ${r}`).join("\n")} />
        </div>
        <ol>
          {result.rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ol>
      </section>
      <section className="panel">
        <h2>Para anunciarlo</h2>
        <div className="grid-3">
          {result.announcements.map((a, i) => (
            <article className="card" key={i}>
              <div className="card-head">
                <span className="card-label">{a.channel}</span>
                <CopyButton text={a.text} />
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{a.text}</p>
            </article>
          ))}
        </div>
      </section>
      <Tips title="Antes de empezar" items={result.legal_checks} />
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

const DRAFT_PREFIX = "pregonia-borrador-";

function readDraft(tool: ToolId): string {
  try {
    return window.localStorage.getItem(DRAFT_PREFIX + tool) ?? "";
  } catch {
    return "";
  }
}

function writeDraft(tool: ToolId, text: string) {
  try {
    if (text.trim()) window.localStorage.setItem(DRAFT_PREFIX + tool, text);
    else window.localStorage.removeItem(DRAFT_PREFIX + tool);
  } catch {
    // Navegación privada o almacenamiento bloqueado: el borrador simplemente no se guarda.
  }
}

function CopyButton({ text, idle = "Copiar" }: { text: string; idle?: string }) {
  const [label, setLabel] = useState(idle);
  // En el móvil se puede enviar el texto directamente a WhatsApp, Instagram, Notas...
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);
  async function share() {
    try {
      await navigator.share({ text });
    } catch {
      // El usuario ha cerrado el menú de compartir: no hay nada que hacer.
    }
  }
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
    <span className="copy-actions">
      <button type="button" className="copy" onClick={copy}>
        {label}
      </button>
      {canShare && (
        <button type="button" className="copy" onClick={share}>
          Compartir
        </button>
      )}
    </span>
  );
}
