# Guía paso a paso: Pregonia 🚀

Esta guía explica con detalle el paso 4 de `PASOS-FINALES.md`, que **puedes hacer tú**. Los pasos con dinero o datos personales (3, 7, 8 y 9) se hacen **con un adulto**, y están al final.

> 🔒 Las claves **secretas** (las que pone *Secret*) **nunca** se pegan en el código ni se mandan por chat. Solo van en Vercel (**Settings** → **Environment Variables**) o en Supabase, cuando lo diga la guía.
>
> ✅ Los nombres de las variables de esta guía son **los que usa la app de verdad**. Escríbelos exactamente igual.

---

## Paso 4: Cloudflare Turnstile (frenar cuentas falsas y robots) 🤖❌

Turnstile es un «no soy un robot» que casi nunca molesta. **La app ya lo trae programado**: se activa sola en cuanto pones la Site Key en Vercel. No hay que instalar nada ni tocar el código.

### 4.1 Crear el widget
1. Entra en **dash.cloudflare.com** y crea una cuenta gratis si no tienes. Vale cualquier correo tuyo.
2. En el menú, abre **Turnstile** → **Add widget**.
3. Nombre: `Pregonia`.
4. En **Hostnames** añade estos cuatro:
   - `anuncio-facil.vercel.app` ⚠️ (es donde está la app; **sin este, nadie podrá entrar**)
   - `localhost`
5. Modo: **Managed** (el recomendado).
6. Pulsa **Create**. Te salen dos claves:
   - **Site Key**: es pública y va en Vercel.
   - **Secret Key**: es secreta y va en Supabase.

### 4.2 Ponerlo en marcha (en este orden)
1. **Vercel** → proyecto `anuncio-facil` → **Settings** → **Environment Variables**: añade `NEXT_PUBLIC_TURNSTILE_SITE_KEY` con la **Site Key**.
2. **Deployments** → los tres puntos del último despliegue → **Redeploy**. Espera a que termine.
3. **Supabase** → **Authentication** → **Attack Protection** (en algunas versiones se llama *Bot and Abuse Protection*): activa **Enable CAPTCHA protection**, elige **Turnstile (Cloudflare)**, pega la **Secret Key** y pulsa **Save**.

⚠️ Hazlo en ese orden y seguido: si activas Supabase antes de que la app tenga la Site Key, nadie podrá entrar.

No hace falta `TURNSTILE_SECRET_KEY` en Vercel: la lista de espera es de Google Forms y no lo necesita.

### 4.3 Probar
- Abre https://anuncio-facil.vercel.app/entrar en una ventana privada, despliega **Acceso para el equipo** y comprueba que sale el recuadro de Cloudflare y que llega el enlace.
- Si falla, mira que `anuncio-facil.vercel.app` esté en **Hostnames** y que hayas hecho **Redeploy**.

---

## Pasos 5 y 6: dominio y correo propios (más adelante) ⏸️

`anunciofacil.es` **no es tuyo**, así que no se puede usar ni para la app ni para enviar correos. Por ahora:
- La app sigue en `https://anuncio-facil.vercel.app`, y funciona perfectamente.
- Los enlaces de acceso los envía el correo de Supabase, que vale mientras haya poca gente.

Cuando tengáis muchos usuarios, el adulto puede comprar un dominio libre (por ejemplo, en Vercel → **Domains** → **Buy**). Con él se conecta la app (paso 5) y se configura Resend (paso 6). Pídemelo entonces y te preparo los pasos exactos.

---

## Pasos que tiene que hacer un ADULTO 👨‍👩‍👦

Estos pasos implican **dinero, contratos o datos personales**. Hazlos **con tu padre, tu madre o el adulto responsable**, y a su nombre.

- **Paso 3, la clave de la IA:**
  - En **platform.claude.com** hay que poner una tarjeta, y cada uso cuesta dinero.
  - Poned un **límite de gasto mensual** y quitad la recarga automática.
  - Guardad la clave solo en Vercel como `ANTHROPIC_API_KEY` y haced **Redeploy**.
- **Paso 7, los textos legales:**
  - Ya están en la app: Aviso legal, Privacidad, Cookies y Términos.
  - El adulto pone sus datos en Vercel: `LEGAL_OWNER_NAME`, `LEGAL_NIF`, `LEGAL_ADDRESS`, `LEGAL_UPDATED` y `LEGAL_SUPABASE_REGION`. Después, **Redeploy**.
  - Mejor que lo revise una gestoría.
- **Paso 8, Stripe (cobrar):**
  - El titular tiene que ser **mayor de edad**.
  - El adulto crea los dos productos (9,99 €/mes y 35 €/mes) y pone en Vercel:
    - `STRIPE_SECRET_KEY`
    - `STRIPE_WEBHOOK_SECRET`
    - `STRIPE_PRICE_ID` (el del Básico)
    - `STRIPE_PRICE_ID_PRO` (el del Pro)
  - La app no necesita la clave publicable.
  - Si cobráis, en España hay que **darse de alta en Hacienda**; que lo consulte con una gestoría.
- **Paso 9, Vercel Pro:** el plan gratis es solo para uso no comercial; para cobrar hace falta **Pro**.

✅ **Orden recomendado:** 4 (Turnstile) → con el adulto: Gmail del negocio, 3, 7, 8 y 9 → 10 (`APP_OPEN=true`) → 11 (¡a cobrar!). Los pasos 5 y 6, cuando tengáis dominio propio.
