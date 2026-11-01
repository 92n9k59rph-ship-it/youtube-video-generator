import Link from "next/link";
import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Privacidad · Tendalia" };

// PLANTILLA: la tiene que revisar el titular y, mejor, alguien que sepa de protección de datos.
export default function Privacidad() {
  return (
    <main>
      <div className="wrap legal">
        <h1>Política de privacidad</h1>
        <p>Última actualización: {LEGAL.updated}</p>

        <h2>Responsable del tratamiento</h2>
        <ul>
          <li>Responsable: {LEGAL.owner}</li>
          <li>NIF: {LEGAL.nif}</li>
          <li>Dirección: {LEGAL.address}</li>
          <li>Correo de contacto: {LEGAL.email}</li>
        </ul>
        <p>
          Tratamos tus datos conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de protección de datos
          personales y garantía de los derechos digitales (LOPDGDD).
        </p>

        <h2>Qué datos tratamos</h2>
        <ul>
          <li><strong>Datos de cuenta:</strong> tu correo electrónico, para crear tu cuenta y enviarte el enlace de acceso.</li>
          <li><strong>Datos de tu negocio:</strong> el nombre, el tipo, la ciudad y el tono que escribas en tu panel.</li>
          <li>
            <strong>Uso del servicio:</strong> lo que pides a la herramienta y los textos que genera, para mostrarte tu historial
            y controlar el límite de uso. Si pegas una reseña o un mensaje de un cliente, puede incluir su nombre: pega solo lo
            necesario.
          </li>
          <li><strong>Opiniones:</strong> lo que nos escribas en el apartado de opiniones de tu panel.</li>
          <li><strong>Lista de espera:</strong> tu correo y el tipo de negocio, si te apuntas en el formulario.</li>
          <li>
            <strong>Datos de pago:</strong> los gestiona Stripe. Nosotros no vemos ni guardamos el número de tu tarjeta; solo
            recibimos el estado de la suscripción, el plan y la fecha de renovación.
          </li>
          <li>
            <strong>Datos técnicos:</strong> dirección IP, tipo de navegador y registros de seguridad, incluida la comprobación
            anti-robots de Cloudflare Turnstile.
          </li>
        </ul>

        <h2>Para qué y con qué base legal</h2>
        <ul>
          <li>Crear y gestionar tu cuenta y prestarte el servicio: ejecución del contrato.</li>
          <li>Cobrar la suscripción y emitir facturas: ejecución del contrato y obligación legal (fiscal).</li>
          <li>Enviarte los correos de acceso y los avisos del servicio, como los cambios de precio: ejecución del contrato.</li>
          <li>Avisarte del lanzamiento si te apuntas a la lista de espera: tu consentimiento.</li>
          <li>Proteger la web frente a robots, fraude y abusos: interés legítimo.</li>
        </ul>
        <p>No te enviamos publicidad ni vendemos tus datos.</p>

        <h2>Cuánto tiempo los guardamos</h2>
        <p>
          Mientras tengas la cuenta. Puedes borrarla tú en cualquier momento desde tu panel («Borrar mi cuenta») y eliminamos
          tus datos, salvo los que debamos conservar por ley: por ejemplo, las facturas se guardan 6 años por la normativa
          mercantil y fiscal. Los datos de la lista de espera se borran cuando te des de baja o cuando dejen de ser necesarios.
        </p>

        <h2>Proveedores que tratan datos por nuestra cuenta</h2>
        <ul>
          <li><strong>Supabase, Inc.:</strong> base de datos, cuentas y envío de los correos de acceso. Ubicación: {LEGAL.supabaseRegion}.</li>
          <li><strong>Vercel Inc.:</strong> alojamiento de la web y de la app (Estados Unidos y otros países).</li>
          <li>
            <strong>Anthropic (API de Claude):</strong> escribe los textos a partir de los datos de tu negocio y de tu petición
            (Estados Unidos). Según sus condiciones comerciales, los datos enviados por la API no se usan para entrenar sus
            modelos.
          </li>
          <li><strong>Stripe Payments Europe, Ltd.:</strong> pagos y suscripciones (Irlanda).</li>
          <li><strong>Cloudflare, Inc.:</strong> comprobación anti-robots (Turnstile).</li>
          <li><strong>Google:</strong> formulario de la lista de espera (Google Forms) y tipos de letra de la web (Google Fonts).</li>
          <li><strong>Resend:</strong> envío de los correos de acceso, cuando lo activemos.</li>
        </ul>
        <p>
          Algunos proveedores están fuera del Espacio Económico Europeo. En esos casos, las transferencias se hacen con las
          garantías del capítulo V del RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo.
          No cedemos tus datos a terceros, salvo obligación legal.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
          portabilidad, y retirar tu consentimiento en cualquier momento, escribiendo a {LEGAL.email}. Si crees que no hemos
          tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
        </p>

        <h2>Edad mínima</h2>
        <p>El servicio está dirigido a mayores de 18 años, porque implica contratar una suscripción de pago.</p>

        <h2>Seguridad</h2>
        <p>Aplicamos medidas técnicas y organizativas adecuadas: conexiones cifradas (HTTPS), control de accesos y protección anti-robots.</p>

        <h2>Cookies</h2>
        <p>Solo usamos cookies técnicas. Tienes los detalles en la <Link href="/cookies">política de cookies</Link>.</p>
      </div>
    </main>
  );
}
