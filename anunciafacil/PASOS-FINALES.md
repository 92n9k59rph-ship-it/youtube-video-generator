# Pasos para terminar Pregonia

> El nombre de la app ahora es **Pregonia** (antes «Anuncio Fácil», que ya usa otra web). El correo del negocio será `pregonia.contacto@gmail.com`: cuando lo creéis, cambiad en Vercel `ADMIN_EMAILS` a ese correo y haced **Redeploy**.

🔒 **La web está en privado.** Todo el mundo ve solo «Muy pronto». La web completa solo la ven:
- los administradores, cuando entran con su correo (`ADMIN_EMAILS`);
- quien abra el enlace secreto de vista previa: `https://anuncio-facil.vercel.app/?vista=TU-CÓDIGO`. El código lo eliges tú y lo pones en Vercel como `PREVIEW_CODE`. No se lo des a nadie.

Cuando esté todo al 100 %, en el paso 10 se pone `SITE_PUBLIC=true` (para que se vea) y `APP_OPEN=true` (para que se pueda usar). La web de la lista de espera también está oculta: la completa está guardada en `web/anunciafacil/index.html`.

## 📋 Lista rápida
0. ✅ **Base de datos (hecho):** ejecutar `supabase/actualizacion-3.sql` en Supabase (SQL Editor → Run). Es una sola línea:
   `alter table public.profiles add column if not exists details text not null default '';`
1. ⏳ **Correo del negocio:** crear el Gmail `pregonia.contacto` (con un adulto).
2. ⏳ **Entrar en la app** con ese correo, en «Acceso para el equipo».
3. ⏳ **Clave de la IA** (con el adulto): platform.claude.com → `ANTHROPIC_API_KEY` en Vercel.
4. ⏳ **Turnstile:** widget «Pregonia» creado ✅ → Site Key y `PREVIEW_CODE` en Vercel ✅ → falta la Secret Key en Supabase (Authentication → Attack Protection).
5. ⏸️ **Dominio propio** (opcional, más adelante): comprar `pregonia.es` o el que esté libre.
6. ⏸️ **Correo propio para los enlaces** con Resend: necesita un dominio propio (paso 5). Mientras, vale el correo de Supabase.
7. ⏳ **Datos legales en Vercel** (con el adulto): nombre, NIF, dirección, fecha y región de Supabase.
8. ⏳ **Stripe** (con el adulto): planes de 15 €, 40 € y 55 €, más las claves en Vercel.
9. ⏳ **Vercel Pro** y darse de alta para facturar.
10. ⏳ **Abrir la app:** `SITE_PUBLIC = true` y `APP_OPEN = true`, y avisar a la lista de espera.
11. ⏳ **Al llegar a la meta secreta:** avisar con 30 días de antelación y empezar a cobrar.

## ✅ Hecho
- La app, en internet: https://anuncio-facil.vercel.app (se ve entera, pero está cerrada).
- Supabase: la base de datos (actualizada) y las direcciones de acceso.
- Vercel: el proyecto `anuncio-facil` con sus ajustes.
- Los planes: Básico, 15 € al mes con 60 generaciones; Pro, 40 € al mes con 150; Premium, 55 € al mes con 350 y todo incluido.
- 11 herramientas, buscador del historial y app para instalar en el móvil.
- La web de la lista de espera, con el botón «Ver planes y precios».
- Los textos legales: Aviso legal, Privacidad, Cookies y Términos.
- La guía con todo el detalle: `GUIA-PASOS.md`.

Abajo tienes cada paso explicado.

---

## 0. Crear el Gmail del negocio (con un adulto, 5 minutos) ⚠️ PENDIENTE
El correo `pregonia.contacto@gmail.com` **todavía no existe**: hay que crearlo. Lo usa la app para que entres como administrador, y además es el correo de contacto que se ve en la web.
1. Lo más fácil es hacerlo en el móvil del adulto: en la app **Gmail**, toca la foto → **Añadir otra cuenta** → **Google** → **Crear cuenta** → **Para mi uso personal**.
2. Nombre: `Pregonia` (sin apellidos, o pon `App`). Elige **Crear tu propia dirección de Gmail** y escribe `pregonia.contacto`.
3. Si ese nombre no está libre o prefieres usar otro correo que ya tengas, cambia en Vercel `ADMIN_EMAILS` y `NEXT_PUBLIC_CONTACT_EMAIL` por ese correo y haz **Redeploy**.

## 1. Actualizar la base de datos ✅ Hecho
1. Abre https://raw.githubusercontent.com/92n9k59rph-ship-it/youtube-video-generator/main/anunciafacil/supabase/actualizacion-2.sql
2. Mantén pulsado, elige **Seleccionar todo** y **Copiar**.
3. En Supabase, entra en **SQL Editor**, pulsa **«+»**, pega y pulsa **Run**. Tiene que salir **«Success»**.

## 2. Probar que entrar funciona (tú, 5 minutos)
1. Abre la app y ve a **Entrar**, después a **«Acceso para el equipo»**.
2. Escribe `pregonia.contacto@gmail.com`, acepta los términos y pulsa **Enviarme el enlace**.
3. Abre el enlace que llega a ese Gmail (mira también en spam).
4. Rellena **Tu negocio** y pulsa **Guardar**. Abre también tu panel `/admin`.

## 3. La IA que escribe los textos (con un adulto, 10 minutos)
Sin esto, el botón «Generar» da error.
1. Entrad en **platform.claude.com** con el Gmail del negocio.
2. En **Billing**, añadid crédito (por ejemplo 10 $) con la tarjeta del adulto, poned un **límite de gasto mensual** y **desactivad la recarga automática**.
3. En **API Keys**, pulsad **Create Key** y copiad la clave, que empieza por `sk-ant-…`. No se la enseñéis a nadie.
4. En Vercel: proyecto `anuncio-facil`, **Settings** y **Environment Variables**. Añadid `ANTHROPIC_API_KEY` con esa clave y guardad.
5. En **Deployments**, pulsad los tres puntos del último despliegue y **Redeploy**.
6. Probad a generar con las 6 herramientas.

## 4. Protección contra cuentas falsas (tú, 10 minutos)
1. En **dash.cloudflare.com**, ve a **Turnstile** y pulsa **Add widget**. De dominio, pon `anuncio-facil.vercel.app`.
2. Copia la **Site Key** y ponla en Vercel como `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
3. Copia la **Secret Key** y pégala en Supabase, en **Authentication** → **Attack Protection**: activa el CAPTCHA y elige **Turnstile**.
4. Haz **Redeploy** en Vercel.

## 5. Dominio propio (opcional, más adelante)
La app funciona perfectamente en `https://anuncio-facil.vercel.app`. Si más adelante queréis una dirección propia, el adulto puede comprar un dominio libre (por ejemplo en Vercel → **Domains** → **Buy**) y yo te guío para conectarlo.

## 6. Correo propio para los enlaces de acceso (antes de tener muchos clientes)
El correo que trae Supabase solo envía unos pocos mensajes por hora. Crea una cuenta gratis en **Resend** o **Brevo** y configúrala en Supabase, en **Authentication** → **SMTP Settings**. Te guío cuando llegues aquí.

## 7. Textos legales (con un adulto, 5 minutos)
Ya están en la app: **Aviso legal**, **Privacidad**, **Cookies** y **Términos**, enlazados abajo en todas las páginas. Solo faltan los datos del titular, que se ponen en Vercel (**Settings** → **Environment Variables**), sin tocar el código:
- `LEGAL_OWNER_NAME`: nombre y apellidos del titular (el adulto responsable).
- `LEGAL_NIF`: su NIF.
- `LEGAL_ADDRESS`: dirección postal.
- `LEGAL_UPDATED`: la fecha de hoy, por ejemplo `1 de noviembre de 2026`.
- `LEGAL_SUPABASE_REGION`: la región de Supabase (en Supabase, **Settings** → **General**), por ejemplo `Unión Europea (Irlanda)`.

Después, **Redeploy**. Conviene que una gestoría o un abogado lo revise antes de cobrar.

---

## 8. Cobros con Stripe (con un adulto: DNI y cuenta bancaria)
1. Crea la cuenta en **stripe.com** y empieza en **modo prueba**.
2. Crea tres productos, todos **recurrentes, mensuales y con impuestos incluidos**:
   - **Pregonia Básico**, 15 EUR. Su ID de precio va en `STRIPE_PRICE_ID`.
   - **Pregonia Pro**, 40 EUR. Su ID de precio va en `STRIPE_PRICE_ID_PRO`.
   - **Pregonia Premium**, 55 EUR. Su ID de precio va en `STRIPE_PRICE_ID_PREMIUM`.
3. En **Claves de API**, copia la clave secreta y ponla en `STRIPE_SECRET_KEY`.
4. Crea el **webhook** apuntando a `https://anuncio-facil.vercel.app/api/stripe/webhook`, con los eventos `checkout.session.completed` y `customer.subscription.*`. Su clave va en `STRIPE_WEBHOOK_SECRET`.
5. Activa el **portal de clientes** (que puedan cancelar y cambiar de plan) y los **recibos por correo**.
6. Prueba un pago con la tarjeta `4242 4242 4242 4242`.
7. Cuando funcione, pasa Stripe a **modo real** y cambia las claves en Vercel.

## 9. Antes de cobrar
- **Vercel Pro**, unos 20 $ al mes: el plan gratis no permite uso comercial.
- **Darse de alta para facturar** (autónomo o lo que te diga un gestor).

---

## 10. 🚀 ABRIR al público
1. En Vercel, añade `SITE_PUBLIC` y `APP_OPEN`, los dos con el valor `true`, y haz **Redeploy**. Desde ese momento la gente ya puede registrarse.
2. Mientras `FREE_LAUNCH=true`, todos lo usan **gratis**, con 10 generaciones al mes.
3. Envía el **correo de lanzamiento** a tu lista de espera. Está en `LANZAMIENTO.md`.
4. Pídeme que cambie los botones de la web de la lista de espera para que lleven a la app.

## 11. Al llegar a tu meta secreta (`LAUNCH_GOAL`)
1. Tu `/admin` te avisa cuando llegues.
2. Envía el **correo de aviso** de que pasa a ser de pago, con 30 días de antelación. Está en `LANZAMIENTO.md`.
3. 30 días después, pon `FREE_LAUNCH` en `false` en Vercel y haz **Redeploy**. Desde entonces se cobra.
