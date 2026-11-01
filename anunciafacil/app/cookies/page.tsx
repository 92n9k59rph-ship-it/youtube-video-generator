import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Cookies · Tendalia" };

// Si algún día se añade analítica o publicidad, hay que añadirla aquí y poner un banner que pida permiso antes.
export default function Cookies() {
  return (
    <main>
      <div className="wrap legal">
        <h1>Política de cookies</h1>
        <p>Última actualización: {LEGAL.updated}</p>

        <h2>Qué son las cookies</h2>
        <p>Son pequeños archivos que una web guarda en tu navegador para funcionar o para recordar información.</p>

        <h2>Cookies que usamos</h2>
        <p>Tendalia solo usa cookies técnicas, necesarias para que el servicio funcione. No usamos cookies de análisis ni de publicidad.</p>
        <ul>
          <li>
            <strong>Sesión (Supabase, propia):</strong> cookies que empiezan por «sb-» y mantienen tu sesión iniciada. Duran
            mientras tengas la sesión abierta y se borran al cerrarla.
          </li>
          <li>
            <strong>Comprobación anti-robots (Cloudflare Turnstile):</strong> cuando está activada en la pantalla de entrar,
            comprueba que no eres un robot. Es de corta duración.
          </li>
          <li>
            <strong>Pagos (Stripe):</strong> cuando te suscribes, el pago se hace en la página segura de Stripe, que usa sus
            propias cookies técnicas para procesar el pago y evitar fraudes. Consulta la política de cookies de Stripe.
          </li>
        </ul>
        <p>
          Para mostrar las letras de la web usamos Google Fonts: tu navegador las descarga de los servidores de Google, que
          reciben tu dirección IP. No instala cookies de seguimiento.
        </p>

        <h2>Consentimiento</h2>
        <p>
          Las cookies técnicas o necesarias no requieren tu consentimiento (artículo 22.2 de la LSSI-CE). Si algún día usamos
          cookies de análisis o de publicidad, solo se activarán si las aceptas, y podrás retirar el consentimiento cuando
          quieras.
        </p>

        <h2>Cómo desactivarlas</h2>
        <p>
          Puedes borrar o bloquear las cookies desde la configuración de tu navegador (Safari, Chrome, Firefox o Edge). Si
          bloqueas las necesarias, no podrás iniciar sesión.
        </p>

        <h2>Más información</h2>
        <p>Escríbenos a {LEGAL.email}.</p>
      </div>
    </main>
  );
}
