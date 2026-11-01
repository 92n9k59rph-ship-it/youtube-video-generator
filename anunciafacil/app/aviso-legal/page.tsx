import { LEGAL } from "@/lib/legal";

export const metadata = { title: "Aviso legal · Pregonia" };

// PLANTILLA: la tiene que revisar el titular y, mejor, una gestoría o un abogado.
export default function AvisoLegal() {
  return (
    <main>
      <div className="wrap legal">
        <h1>Aviso legal</h1>
        <p>Última actualización: {LEGAL.updated}</p>

        <h2>Datos del titular</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio
          electrónico (LSSI-CE), se informa de que la aplicación Pregonia y esta web son titularidad de:
        </p>
        <ul>
          <li>Titular: {LEGAL.owner}</li>
          <li>NIF: {LEGAL.nif}</li>
          <li>Domicilio: {LEGAL.address}</li>
          <li>Correo electrónico: {LEGAL.email}</li>
        </ul>

        <h2>Objeto</h2>
        <p>
          Pregonia es un servicio en línea que escribe, con inteligencia artificial, textos de marketing para negocios:
          publicaciones para redes sociales, correos para clientes, respuestas a reseñas, mensajes de WhatsApp, respuestas a
          mensajes de clientes y textos para carteles y menús.
        </p>

        <h2>Condiciones de uso</h2>
        <p>
          Al usar el sitio aceptas este aviso legal. Te comprometes a usar el sitio y sus servicios de forma lícita, sin
          vulnerar derechos de terceros ni la normativa vigente, y a no introducir contenidos ilícitos, ofensivos, engañosos o
          que infrinjan derechos de propiedad intelectual o industrial.
        </p>

        <h2>Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos, el diseño, los logotipos, la marca y el código de Pregonia pertenecen a {LEGAL.owner} o a sus
          licenciantes. Queda prohibida su reproducción, distribución o transformación sin autorización expresa. Los textos que
          generes con la herramienta son tuyos, en los términos de las condiciones de uso.
        </p>

        <h2>Responsabilidad</h2>
        <p>
          El titular no se responsabiliza de las interrupciones del servicio por causas técnicas ajenas a su control ni del uso
          que los usuarios hagan de los textos generados. Los textos generados con inteligencia artificial pueden contener
          errores y tienes que revisarlos antes de publicarlos.
        </p>

        <h2>Enlaces</h2>
        <p>El sitio puede contener enlaces a webs de terceros, de cuyo contenido el titular no se hace responsable.</p>

        <h2>Legislación y jurisdicción</h2>
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier controversia con consumidores serán competentes
          los juzgados y tribunales del domicilio del consumidor.
        </p>
      </div>
    </main>
  );
}
