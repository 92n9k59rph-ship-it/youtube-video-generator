"use client";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main>
      <div className="wrap stack" style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: "2.2rem" }}>Algo ha fallado</h1>
        <p className="muted">
          Ha habido un problema al cargar la página. Inténtalo de nuevo y, si sigue pasando, escríbenos a
          {CONTACT_EMAIL}.
        </p>
        <button className="btn btn-primary" type="button" onClick={reset} style={{ alignSelf: "flex-start" }}>
          Volver a intentarlo
        </button>
      </div>
    </main>
  );
}
