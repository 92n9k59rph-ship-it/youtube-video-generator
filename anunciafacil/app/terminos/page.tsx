import { LEGAL } from "@/lib/legal";
import { PLANS, planLimit } from "@/lib/plans";

export const metadata = { title: "Términos · Anuncio Fácil" };

// PLANTILLA: la tiene que revisar el titular y, mejor, una gestoría o un abogado antes de cobrar.
export default function Terminos() {
  return (
    <main>
      <div className="wrap legal">
        <h1>Términos y condiciones</h1>
        <p>Última actualización: {LEGAL.updated}</p>

        <h2>Partes</h2>
        <p>
          Estas condiciones regulan el uso y la contratación de Anuncio Fácil, servicio prestado por {LEGAL.owner}, con NIF{" "}
          {LEGAL.nif} y domicilio en {LEGAL.address}, contacto {LEGAL.email} («el proveedor»), a la persona que se registra y
          contrata («el usuario»). Para contratar tienes que ser mayor de 18 años.
        </p>

        <h2>El servicio</h2>
        <p>
          Anuncio Fácil escribe, con inteligencia artificial, propuestas de textos para negocios: publicaciones para redes
          sociales con ideas de vídeos cortos y calendario, correos para clientes, respuestas a reseñas, mensajes de WhatsApp,
          respuestas a mensajes de clientes y textos para carteles y menús.
        </p>
        <p>
          Los textos pueden contener errores. Antes de publicarlos, revísalos y completa los datos marcados entre corchetes,
          como precios u horarios. Eres responsable de lo que publiques.
        </p>
        <p>
          Anuncio Fácil solo escribe los textos; no envía correos ni mensajes. Si los envías tú, hazlo solo a clientes que
          hayan aceptado recibirlos y dales una forma sencilla de darse de baja, como exige la ley.
        </p>

        <h2>Lanzamiento gratis</h2>
        <p>
          Durante el periodo de lanzamiento, de duración limitada, Anuncio Fácil es gratis, con el límite de generaciones
          mensuales que se indique en la web. Avisaremos por correo al menos 30 días antes de que pase a ser de pago. Nunca se
          cobra nada sin que te suscribas tú.
        </p>

        <h2>Planes y precios</h2>
        <ul>
          <li>
            <strong>{PLANS.basic.name}:</strong> {PLANS.basic.priceLabel} al mes, hasta {planLimit("basic")} generaciones al mes
            de publicaciones para redes, correos y carteles.
          </li>
          <li>
            <strong>{PLANS.pro.name}:</strong> {PLANS.pro.priceLabel} al mes, hasta {planLimit("pro")} generaciones al mes y
            todas las herramientas, incluidas las respuestas a reseñas, los mensajes de WhatsApp y las respuestas a mensajes de
            clientes.
          </li>
          <li>Los precios incluyen IVA.</li>
          <li>El pago se hace por adelantado cada mes con tarjeta, a través de Stripe.</li>
          <li>La suscripción se renueva automáticamente cada mes hasta que la canceles.</li>
          <li>Si cambiamos los precios, te avisaremos con al menos 30 días de antelación y podrás cancelar antes de que se aplique el cambio.</li>
        </ul>

        <h2>Cómo se contrata</h2>
        <ol>
          <li>Te registras con tu correo.</li>
          <li>Eliges un plan en tu panel.</li>
          <li>Pagas en la página segura de Stripe.</li>
          <li>Recibes un recibo por correo con el resumen de la contratación.</li>
        </ol>
        <p>El contrato se formaliza en español.</p>

        <h2>Cancelación</h2>
        <p>
          Puedes cancelar cuando quieras desde «Gestionar suscripción y facturas» en tu panel o escribiendo a {LEGAL.email}.
          La cancelación tiene efecto al final del periodo ya pagado: seguirás teniendo acceso hasta entonces y no se te volverá
          a cobrar. Salvo lo indicado en el apartado de desistimiento, no se devuelve la parte del mes ya pagada.
        </p>

        <h2>Derecho de desistimiento (14 días)</h2>
        <p>
          Si eres consumidor, puedes desistir del contrato en un plazo de 14 días naturales desde la contratación, sin
          necesidad de justificarlo (artículos 102 y siguientes del Real Decreto Legislativo 1/2007, Ley General para la
          Defensa de los Consumidores y Usuarios).
        </p>
        <ul>
          <li>
            <strong>Cómo hacerlo:</strong> envía un correo a {LEGAL.email} diciendo que desistes, con tu nombre y el correo de tu
            cuenta. Puedes usar el modelo de abajo, aunque no es obligatorio.
          </li>
          <li>
            <strong>Si empezaste a usar el servicio en esos 14 días:</strong> al suscribirte nos pides expresamente que el
            servicio empiece de inmediato. Si después desistes, pagarás la parte proporcional del servicio ya prestado hasta que
            nos comuniques el desistimiento (artículo 108.3).
          </li>
          <li>Te devolveremos el dinero que corresponda en un máximo de 14 días, por el mismo medio de pago.</li>
        </ul>
        <p><strong>Modelo de formulario de desistimiento:</strong></p>
        <p>
          A la atención de {LEGAL.owner}, {LEGAL.address}, {LEGAL.email}: por la presente le comunico que desisto de mi
          contrato de suscripción al servicio Anuncio Fácil. Contratado el: ______ · Nombre: ______ · Correo de la cuenta:
          ______ · Fecha: ______ · Firma (solo si se envía en papel).
        </p>

        <h2>Uso aceptable</h2>
        <p>
          No está permitido usar el servicio para crear contenido ilegal, engañoso, discriminatorio, ofensivo o que infrinja
          derechos de terceros, ni intentar dañar o saturar el sistema. Si se incumple, podremos suspender la cuenta.
        </p>

        <h2>Propiedad del contenido</h2>
        <p>Los textos que generes son tuyos y puedes usarlos libremente. La plataforma, su código y su marca son del proveedor.</p>

        <h2>Disponibilidad y responsabilidad</h2>
        <p>
          Haremos lo posible para que el servicio funcione siempre, pero puede haber paradas por mantenimiento o por fallos de
          proveedores externos. Nuestra responsabilidad se limita, en la medida en que la ley lo permita, al importe pagado en
          los últimos 12 meses. Nada de esto limita tus derechos como consumidor.
        </p>

        <h2>Cambios en las condiciones</h2>
        <p>Si cambiamos estas condiciones, te avisaremos por correo con antelación. Si no estás de acuerdo, puedes cancelar.</p>

        <h2>Reclamaciones y ley aplicable</h2>
        <p>
          Para cualquier queja, escríbenos a {LEGAL.email}. Se aplica la ley española, y son competentes los juzgados del
          domicilio del consumidor.
        </p>
      </div>
    </main>
  );
}
