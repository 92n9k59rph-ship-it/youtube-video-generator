export const metadata = { title: "Términos · AnunciaFácil" };

// BORRADOR: revisar con alguien que sepa de temas legales antes de cobrar a clientes reales.
export default function Terminos() {
  return (
    <main>
      <div className="wrap legal">
        <h1>Términos de uso</h1>
        <p>Última actualización: [fecha]</p>

        <h2>El servicio</h2>
        <p>AnunciaFácil genera, con inteligencia artificial, propuestas de textos para negocios: publicaciones para redes sociales, ideas de vídeos cortos, calendarios de publicación, correos para clientes, respuestas a reseñas, mensajes de WhatsApp y textos para carteles y menús. Lo presta David Lázaro (anunciafacil.contacto@gmail.com · [NIF y dirección postal]).</p>

        <h2>Revisa siempre los textos</h2>
        <p>Los textos los genera una inteligencia artificial y pueden contener errores. Antes de publicarlos, revísalos y completa los datos marcados entre corchetes, como precios u horarios. Eres responsable de lo que publiques en tus redes.</p>

        <h2>Correos y mensajes a tus clientes</h2>
        <p>AnunciaFácil solo escribe los textos; no envía correos ni mensajes. Si los envías tú, hazlo solo a clientes que hayan aceptado recibirlos y dales una forma sencilla de darse de baja, como exige la ley.</p>

        <h2>Precio y pago</h2>
        <ul>
          <li>Durante el periodo de lanzamiento (hasta alcanzar el número de negocios registrados que se indica en la web), AnunciaFácil es gratis con el límite de generaciones mensuales que se indique. Avisaremos por correo al menos 30 días antes de que pase a ser de pago; nunca se cobra nada sin que te suscribas tú.</li>
          <li>Fuera del lanzamiento, para usar AnunciaFácil hace falta una suscripción activa, salvo las generaciones de prueba gratis que se indiquen en la web en cada momento.</li>
          <li>Suscripción: 9,99 € al mes, IVA incluido, con hasta 100 generaciones al mes. Se cobra por adelantado cada mes a través de Stripe.</li>
          <li>Podemos cambiar el precio avisándote con al menos 30 días de antelación.</li>
        </ul>

        <h2>Cancelación</h2>
        <p>Puedes cancelar cuando quieras desde «Gestionar suscripción» en tu panel. Seguirás teniendo acceso hasta el final del periodo ya pagado y no se te volverá a cobrar.</p>
        <p>[Revisar el derecho de desistimiento de 14 días si el cliente es un consumidor y no una empresa.]</p>

        <h2>Uso correcto</h2>
        <p>No uses AnunciaFácil para crear contenido engañoso, ilegal, ofensivo o que infrinja derechos de otras personas. Podemos suspender cuentas que lo hagan.</p>

        <h2>Disponibilidad</h2>
        <p>Intentamos que el servicio funcione siempre, pero puede haber interrupciones por mantenimiento o fallos de los proveedores.</p>

        <h2>Ley aplicable</h2>
        <p>Estos términos se rigen por la ley española.</p>
      </div>
    </main>
  );
}
