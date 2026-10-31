# Guía para poner en marcha Anuncio Fácil

Esta carpeta tiene la herramienta completa: registro de clientes, pago mensual con Stripe, panel de cada cliente y cinco generadores de textos con Claude:
- publicaciones para redes, con idea de Reel y calendario;
- correos para clientes;
- respuestas a reseñas de Google;
- mensajes de WhatsApp;
- textos para carteles y menús. Para que funcione en internet hay que crear **4 cuentas** y copiar unas claves. Todo se puede hacer desde el iPad, en Safari.

> **Importante:** las claves son secretas. No las pegues en GitHub ni se las enseñes a nadie. Solo van en Vercel (paso 4).

Orden recomendado: **Supabase → Anthropic → Vercel → probar → abrir gratis al público.** Stripe (los cobros) se deja para cuando haya muchos clientes.

> **Lanzamiento gratis:** la app empieza en modo gratis (`FREE_LAUNCH=true`). Nadie paga y cada cliente tiene hasta 10 generaciones al mes. Así atraes clientes sin necesitar Stripe, cuenta bancaria ni alta para facturar. **Lo único que pagas tú es la IA** (paso 2). Con 100 clientes que usen todo su límite, serían unas 1.000 generaciones al mes; a unos pocos céntimos cada una, pueden ser **unas decenas de euros al mes**. Por eso es importante poner el **límite de gasto** en Anthropic. Mira el gasto real en tu panel `/admin`.

---

## Paso 1. Supabase (cuentas de clientes y base de datos) · gratis para empezar

1. Entra en **supabase.com** → «Start your project» → regístrate con GitHub.
2. **New project**:
   - Nombre: `anunciafacil`
   - Contraseña de la base de datos: inventa una segura y guárdala.
   - Región: **Central EU (Frankfurt)**, la más cercana a España.
3. Cuando termine de crearse, ve a **SQL Editor** → **New query**.
4. Abre el archivo `supabase/schema.sql` de esta carpeta en GitHub, copia todo su contenido, pégalo y pulsa **Run**. Debe decir «Success».
5. Ve a **Project Settings → API** (o «API Keys») y apunta estas tres cosas:
   - **Project URL** → irá en `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / publishable key** → irá en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role / secret key** → irá en `SUPABASE_SERVICE_ROLE_KEY` (esta es la más secreta de todas)

El paso 4 tiene una parte más de Supabase, cuando ya sepas la dirección de la web.

> **Si ya ejecutaste `schema.sql` antes del 30 de octubre**, ejecuta también `supabase/actualizacion-1.sql` de la misma forma (copiar, pegar y Run). Añade la protección que impide saltarse el límite de usos y la tabla de opiniones de los clientes.

> **Protección contra abusos (recomendado antes de abrir al público):** sirve para que nadie cree cientos de cuentas falsas y gaste tus generaciones gratis. Hazlo después del paso 4, cuando ya tengas la dirección de la app:
> 1. Crea una cuenta gratis en **dash.cloudflare.com** → **Turnstile** → **Add widget**. Pon como dominio la dirección de Vercel (sin `https://`).
> 2. Copia la **Site Key** y ponla en Vercel como `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Después haz **Redeploy**.
> 3. Copia la **Secret Key** y pégala en Supabase → **Authentication → Attack Protection** → activa **Enable CAPTCHA protection** → proveedor **Turnstile**.
> 4. Comprueba que en la página «Entrar» aparece la casilla de seguridad y que el enlace sigue llegando.

> **Correos de acceso:** Supabase envía el enlace para entrar con su propio servidor de correo, que solo permite unos pocos correos por hora. Para probar sirve. Antes de tener muchos clientes, configura un servicio de correo propio en **Authentication → SMTP Settings** (por ejemplo Resend o Brevo, que tienen plan gratuito). Te ayudo cuando llegue el momento.

---

## Paso 2. Anthropic (la inteligencia artificial que escribe los textos) · de pago por uso

1. Entra en **console.anthropic.com** y crea una cuenta. Tiene que hacerlo un adulto, porque pide tarjeta.
2. **Billing** → añade crédito (por ejemplo 10 €) y pon un **límite de gasto mensual** (*spend limit*). Así nunca gastarás más de lo que decidas.
3. **API Keys** → **Create Key** → nombre `anunciafacil` → copia la clave, que empieza por `sk-ant-`. Solo se muestra una vez → irá en `ANTHROPIC_API_KEY`.

**Cuánto cuesta:** cada generación (publicaciones + Reel + calendario) usa el modelo Claude Opus 5.5 con esfuerzo bajo. Según los precios oficiales (4 $ por millón de tokens de entrada y 20 $ por millón de salida), cada generación debería costar unos pocos céntimos. Es una **estimación**: mira el gasto real en la consola de Anthropic después de las primeras pruebas.

| Si cada generación cuesta… | Un cliente que usa las 100 del mes te cuesta… |
|---|---|
| 0,03 $ | 3 $ |
| 0,05 $ | 5 $ |

Con 9,99 € al mes (IVA incluido, unos 8,26 € sin IVA), menos la comisión de Stripe, sigue quedando beneficio, pero el margen es ajustado si alguien usa las 100. Si quieres más margen, tienes dos opciones:
- Cambiar `CLAUDE_MODEL` a `claude-sonnet-5-5`: cuesta la mitad, con algo menos de calidad.
- Bajar `MONTHLY_GENERATIONS`, por ejemplo a 50.

La mayoría de clientes no usa todo el límite.

---

## Paso 3. Stripe (cobrar las cuotas) · **sáltatelo durante el lanzamiento gratis**

Hazlo cuando vayas a empezar a cobrar (paso 7). Mientras `FREE_LAUNCH=true`, la app no lo necesita.

La cuenta tiene que estar **a nombre de un adulto**, con sus datos y su cuenta bancaria.

1. Entra en **stripe.com** → crea una cuenta.
2. Arriba, activa **«Modo de prueba» / «Test mode»**. Así nadie paga dinero real mientras pruebas.
3. **Catálogo de productos → Añadir producto**:
   - Nombre: `Anuncio Fácil`
   - Precio: **9,99 EUR**, **Recurrente**, **Mensual**
   - En «Incluye impuestos», elige **Sí (impuestos incluidos)**.
   - Guarda y copia el **ID del precio** (empieza por `price_`) → irá en `STRIPE_PRICE_ID`.
4. **Desarrolladores → Claves de API** → copia la **clave secreta** (empieza por `sk_test_`) → irá en `STRIPE_SECRET_KEY`.
5. **Configuración → Facturación → Portal de clientes** → actívalo y permite que los clientes **cancelen** su suscripción y **actualicen la tarjeta**.
6. **Configuración → Correos electrónicos de clientes** → activa **«Pagos correctos»** y **«Facturas»**, para que cada cliente reciba su recibo por correo después de pagar.
7. El **webhook** (el aviso que Stripe manda cuando alguien paga) se crea en el paso 4, cuando ya tengas la dirección de la web.

---

## Paso 4. Vercel (poner la herramienta en internet) · gratis para empezar

1. Entra en **vercel.com** → regístrate con **GitHub**.
2. **Add New → Project** → elige el repositorio `youtube-video-generator` → **Import**.
3. En **Root Directory** pulsa **Edit** y elige la carpeta **`anunciafacil`**. Esto es muy importante.
4. Abre **Environment Variables** y añade una a una todas las de `.env.example`, con los valores que has apuntado:
   - `NEXT_PUBLIC_SITE_URL`: de momento pon `https://anunciafacil.vercel.app`; la corregirás en el punto 6.
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY` y `CLAUDE_MODEL` (con el valor `claude-opus-5-5`)
   - `FREE_LAUNCH`: con el valor `true` (lanzamiento gratis). `LAUNCH_MONTHLY_GENERATIONS`: con el valor `10` (generaciones gratis al mes por cliente). `LAUNCH_GOAL`: tu **meta secreta** de negocios (el número que acordamos). Solo está en Vercel, no la escribas en GitHub; tu panel `/admin` te avisa al llegar.
   - `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` y `STRIPE_WEBHOOK_SECRET`: **no hacen falta durante el lanzamiento gratis**; se añaden en el paso 7.
   - `ADMIN_EMAILS`: el correo con el que entrarás tú en la app (por ejemplo `anunciafacil.contacto@gmail.com`). Te da acceso a tu panel de administración en `/admin`.
   - `FREE_GENERATIONS` (con el valor `3`: generaciones de prueba gratis antes de pagar; `0` quita la prueba) y `MONTHLY_GENERATIONS` (con el valor `100`)
5. Pulsa **Deploy** y espera 1–2 minutos.
6. Copia la dirección que te da Vercel (por ejemplo `https://anunciafacil-xxxx.vercel.app`) y:
   - **En Vercel:** Settings → Environment Variables → cambia `NEXT_PUBLIC_SITE_URL` por esa dirección, sin barra al final.
   - **En Supabase:** Authentication → URL Configuration:
     - **Site URL:** tu dirección de Vercel.
     - **Redirect URLs:** añade `https://TU-DIRECCION/auth/callback`
   - **En Stripe (solo cuando vayas a cobrar, paso 7):** Desarrolladores → Webhooks → **Añadir destino / endpoint**:
     - URL: `https://TU-DIRECCION/api/stripe/webhook`
     - Eventos: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated` y `customer.subscription.deleted`
     - Guarda y copia el **secreto de firma** (empieza por `whsec_`). Ponlo en Vercel como `STRIPE_WEBHOOK_SECRET`.
7. En Vercel: **Deployments** → los tres puntos del último → **Redeploy**, para que use las variables nuevas.

> **Sobre la rama:** el código está en la rama `claude/youtube-video-creator-agent-2lrw41`. Vercel publica por defecto la rama `main`. Si Vercel no encuentra la carpeta `anunciafacil`, pídeme que prepare una *pull request* para pasarla a `main`, o elige esa rama en Vercel → Settings → Git.

---

### Conectar tu dominio `anunciofacil.es`

Tu web de presentación ya está en `anunciofacil.es`. Lo más sencillo es poner la app en un **subdominio**: **`app.anunciofacil.es`**.
1. En Vercel → tu proyecto → **Settings → Domains** → añade `app.anunciofacil.es`.
2. Vercel te dirá que añadas un registro **CNAME**. Entra en la web donde compraste el dominio → **DNS** → añade ese registro tal cual. Puede tardar desde unos minutos hasta unas horas.
3. Cuando Vercel lo marque como válido:
   - Cambia `NEXT_PUBLIC_SITE_URL` a `https://app.anunciofacil.es` y haz **Redeploy**.
   - En Supabase → Authentication → URL Configuration, cambia la **Site URL** y añade `https://app.anunciofacil.es/auth/callback` en **Redirect URLs**.
4. En tu web `anunciofacil.es`, haz que los botones **«Iniciar sesión»** y **«Próximamente»** lleven a `https://app.anunciofacil.es/entrar`.

## Paso 5. Probar todo

**Durante el lanzamiento gratis:** entra con tu correo, rellena **Tu negocio**, prueba las cinco herramientas y comprueba que en «Tu plan» pone **Lanzamiento gratis**. También puedes abrir tu panel `/admin`.

**Cuando actives los cobros (paso 7), prueba también el pago con dinero de mentira:**

1. Abre tu dirección de Vercel → **Empezar** → escribe tu correo → abre el enlace que te llega.
2. Rellena **Tu negocio** y pulsa **Guardar**.
3. Pulsa **Suscribirme** y paga con la tarjeta de prueba de Stripe:
   - Número: `4242 4242 4242 4242`
   - Fecha: cualquiera futura
   - CVC: cualquiera
4. Al volver al panel debe poner **Suscripción activa**. Si no, recarga a los pocos segundos.
5. Prueba las cinco herramientas: elige una, escribe qué necesitas y pulsa **Generar**. En unos segundos deberían salir los textos.
6. Pulsa **Gestionar suscripción** y prueba a cancelar.

Si algo falla, mándame una captura y lo arreglo.

---

## Paso 6. Abrir gratis al público

1. Activa el **CAPTCHA** (ver paso 1) para evitar cuentas falsas.
2. Comprueba que tienes el **límite de gasto** puesto en Anthropic.
3. Comparte la app: envía el correo de `LANZAMIENTO.md` a tu lista de espera y difúndela.

## Paso 7. Empezar a cobrar (cuando haya muchos clientes)

1. **Avisa a tus clientes por correo al menos 30 días antes**, como dicen los términos. Diles el precio y que solo pagarán si se suscriben.
2. Haz el **paso 3 (Stripe)** y conecta el webhook del paso 4.
3. En Vercel pon `FREE_LAUNCH` en `false`, añade las variables de Stripe y haz **Redeploy**. Desde ese momento, cada cliente tiene las generaciones de prueba (`FREE_GENERATIONS`) y después tiene que suscribirse.
4. Prueba el pago con la tarjeta de prueba (paso 5) antes de pasar Stripe a modo real.

### Pasar Stripe a modo real

1. **Stripe:** desactiva el modo de prueba, completa la verificación de la cuenta y repite el paso 3 en modo real. Tendrás un nuevo `price_…`, un `sk_live_…` y un webhook nuevo con su `whsec_…`.
2. **Vercel:** cambia `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` y `STRIPE_WEBHOOK_SECRET` por los valores reales y haz **Redeploy**.
3. **Revisa los textos legales** (`/privacidad` y `/terminos`): son un borrador. Hay que completar lo marcado entre corchetes (NIF, dirección, fecha) y conviene que los revise alguien que sepa de temas legales.
4. **Date de alta para facturar** (autónomo o lo que corresponda) antes de empezar a cobrar.
5. **Avisa a tu lista de espera** con un correo desde `anunciafacil.contacto@gmail.com`. Te lo preparo cuando llegues aquí.
