import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="wrap stack" style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: "2.2rem" }}>Esta página no existe</h1>
        <p className="muted">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
        <Link className="btn btn-primary" href="/" style={{ alignSelf: "flex-start" }}>Ir al inicio</Link>
      </div>
    </main>
  );
}
