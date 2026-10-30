export const metadata = { title: "Privacidad · AnunciaFácil" };

// BORRADOR: revisar con alguien que sepa de protección de datos antes de cobrar a clientes reales.
export default function Privacidad() {
  return (
    <main>
      <div className="wrap legal">
        <h1>Política de privacidad</h1>
        <p>Última actualización: [fecha]</p>

        <h2>Quién es el responsable</h2>
        <p>David Lázaro · anunciafacil.contacto@gmail.com · [NIF y dirección postal]</p>

        <h2>Qué datos tratamos</h2>
        <ul>
          <li>Tu correo electrónico, para crear tu cuenta y enviarte el enlace de acceso.</li>
          <li>Los datos de tu negocio que escribas (nombre, tipo, ciudad y tono).</li>
          <li>Lo que pidas a la herramienta y los textos que te genera, para mostrarte tu historial y controlar el límite de uso. Si pegas una reseña de un cliente, puede incluir su nombre: pega solo lo necesario.</li>
          <li>El estado de tu suscripción. Los datos de la tarjeta los gestiona Stripe; nosotros no los vemos ni los guardamos.</li>
        </ul>

        <h2>Para qué y con qué base</h2>
        <p>Usamos estos datos para prestarte el servicio que contratas (base legal: ejecución del contrato) y para cumplir nuestras obligaciones legales, como la facturación.</p>

        <h2>Con quién los compartimos</h2>
        <p>Solo con los proveedores necesarios para que funcione el servicio:</p>
        <ul>
          <li>Supabase: base de datos y cuentas de usuario.</li>
          <li>Stripe: cobro de la suscripción.</li>
          <li>Anthropic: genera los textos a partir de los datos de tu negocio y de tu petición.</li>
          <li>Vercel: alojamiento de la web.</li>
        </ul>
        <p>Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, con las garantías que exige la normativa (por ejemplo, cláusulas contractuales tipo). [Revisar y enlazar la información de cada proveedor.]</p>
        <p>No vendemos tus datos ni los usamos para publicidad.</p>

        <h2>Cuánto tiempo los guardamos</h2>
        <p>Mientras tengas la cuenta. Si la borras, eliminamos tus datos salvo los que debamos conservar por ley (por ejemplo, facturas).</p>

        <h2>Tus derechos</h2>
        <p>Puedes pedir acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo a anunciafacil.contacto@gmail.com. Si no estás conforme con la respuesta, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>

        <h2>Cookies</h2>
        <p>Solo usamos las cookies técnicas necesarias para mantener tu sesión iniciada. No usamos cookies de publicidad ni de análisis.</p>
      </div>
    </main>
  );
}
