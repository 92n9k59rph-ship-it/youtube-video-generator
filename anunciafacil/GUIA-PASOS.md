# Guía paso a paso: Anuncio Fácil 🚀

Esta guía explica con detalle los pasos 4, 5 y 6 de `PASOS-FINALES.md`, que **puedes hacer tú**. Los pasos con dinero o datos personales (3, 7, 8 y 9) se hacen **con un adulto**, y están al final.

> 🔒 Las claves **secretas** (las que pone *Secret*) **nunca** se pegan en el código ni se mandan por chat. Solo van en Vercel (**Settings** → **Environment Variables**) o en Supabase, cuando lo diga la guía.
>
> ✅ Los nombres de las variables de esta guía son **los que usa la app de verdad**. Escríbelos exactamente igual.

---

## Paso 4: Cloudflare Turnstile (frenar cuentas falsas y robots) 🤖❌

Turnstile es un «no soy un robot» que casi nunca molesta. **La app ya lo trae programado**: se activa sola en cuanto pones la Site Key en Vercel. No hay que instalar nada ni tocar el código.

### 4.1 Crear el widget
1. Entra en **dash.cloudflare.com** y crea una cuenta gratis si no tienes. Vale cualquier correo tuyo.
2. En el menú, abre **Turnstile** → **Add widget**.
3. Nombre: `Anuncio Fácil`.
4. En **Hostnames** añade estos cuatro:
   - `anuncio-facil.vercel.app` ⚠️ (es donde está la app ahora; **sin este, nadie podrá entrar**)
   - `anunciofacil.es`
   - `app.anunciofacil.es`
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

## Paso 5: Conectar app.anunciofacil.es (opcional) 🌐

Necesitas entrar en **IONOS**, que es donde está tu dominio.

1. Vercel → proyecto `anuncio-facil` → **Settings** → **Domains** → **Add Domain**.
2. Escribe `app.anunciofacil.es` y pulsa **Add**.
3. Vercel te enseña un registro **CNAME**. Cópialo **tal cual te lo da Vercel**: cada proyecto tiene su propio valor.
4. En **IONOS** → **Dominios** → `anunciofacil.es` → **DNS** → **Añadir registro**:

| Tipo | Nombre | Valor |
|---|---|---|
| `CNAME` | `app` | el valor que te dio Vercel |

   Si ya existe otro registro `app`, bórralo o cámbialo primero.
5. Espera de unos minutos a unas horas. En Vercel saldrá **Valid Configuration** ✅ y el candado HTTPS se pone solo.
6. En **Vercel**, cambia `NEXT_PUBLIC_SITE_URL` a `https://app.anunciofacil.es` y haz **Redeploy**.
7. En **Supabase** → **Authentication** → **URL Configuration**:
   - **Site URL**: `https://app.anunciofacil.es`
   - **Redirect URLs**: añade `https://app.anunciofacil.es/auth/callback`

   Deja también la dirección antigua de Vercel, así los enlaces que ya se enviaron siguen funcionando.

---

## Paso 6: Correo propio para los enlaces de acceso (Resend) ✉️

El correo que trae Supabase es solo para pruebas y envía muy pocos correos por hora. Con Resend, los enlaces saldrán de tu dominio, por ejemplo desde `no-reply@anunciofacil.es`. También necesitas entrar en **IONOS**.

### 6.1 Añadir el dominio en Resend
1. Crea una cuenta en **resend.com**. El plan gratis sirve para empezar.
2. **Domains** → **Add Domain**. Mejor un subdominio solo para envíos: `mail.anunciofacil.es`.
3. Región: **Ireland (eu-west-1)**, que está en Europa.

### 6.2 Poner los registros DNS en IONOS
Resend te enseña varios registros (DKIM, SPF y, recomendado, DMARC). **Copia los valores exactos de tu panel de Resend** y añádelos en **IONOS** → **DNS**. Después vuelve a Resend y pulsa **Verify**. Cuando salga **Verified** ✅, sigue.

⚠️ No toques los registros **MX** que ya hay (`mx00.ionos.es` y `mx01.ionos.es`): son los que reciben tu correo `contacto@anunciofacil.es`.

### 6.3 Crear la clave
Resend → **API Keys** → **Create API Key** → permiso **Sending access**. Cópiala; empieza por `re_` y solo se ve una vez.

### 6.4 Conectarlo a Supabase
Supabase → **Authentication** → **Emails** → **SMTP Settings** → activa **Enable Custom SMTP**:

| Campo | Valor |
|---|---|
| Sender email | `no-reply@mail.anunciofacil.es` |
| Sender name | `Anuncio Fácil` |
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | tu clave de Resend (`re_…`) |

Pulsa **Save**. Luego, en **Authentication** → **Rate Limits**, puedes subir el número de correos por hora.

### 6.5 Probar
Pide un enlace de acceso con tu correo. Tiene que llegar desde `no-reply@mail.anunciofacil.es`. Si cae en spam, revisa en Resend que todo esté en verde.

> Alternativa: **Brevo** funciona igual (host `smtp-relay.brevo.com`, puerto `587`, usuario y clave SMTP de tu panel de Brevo).

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

✅ **Orden recomendado:** 4 (Turnstile) → con IONOS: 6 (correo) y 5 (dominio) → con el adulto: 3, 7, 8 y 9 → 10 (`APP_OPEN=true`) → 11 (¡a cobrar!).
