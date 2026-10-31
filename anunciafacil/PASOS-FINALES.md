# Pasos para terminar Anuncio Fácil

Mientras no hagas el paso 10, la web **se ve entera** (precios, herramientas, gratis) pero **nadie puede usarla**: los botones llevan a la lista de espera y solo entra el correo de administrador.

## ✅ Hecho
- La app, en internet: https://anuncio-facil.vercel.app
- Supabase: la base de datos y las direcciones de acceso.
- Vercel: el proyecto `anuncio-facil` con sus ajustes.
- Los planes: Básico, 9,99 € al mes con 50 generaciones; Pro, 35 € al mes con 200 generaciones y todas las herramientas.

---

## 1. Actualizar la base de datos (tú, 2 minutos)
1. Abre https://raw.githubusercontent.com/92n9k59rph-ship-it/youtube-video-generator/main/anunciafacil/supabase/actualizacion-2.sql
2. Mantén pulsado, elige **Seleccionar todo** y **Copiar**.
3. En Supabase, entra en **SQL Editor**, pulsa **«+»**, pega y pulsa **Run**. Tiene que salir **«Success»**.

## 2. Probar que entrar funciona (tú, 5 minutos)
1. Abre la app y ve a **Entrar**, después a **«Acceso para el equipo»**.
2. Escribe `anunciafacil.contacto@gmail.com`, acepta los términos y pulsa **Enviarme el enlace**.
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

## 5. Tu dominio `app.anunciofacil.es` (opcional, 15 minutos)
1. En Vercel, entra en **Settings** → **Domains** y añade `app.anunciofacil.es`.
2. En la web donde compraste el dominio, añade el registro **CNAME** que te indique Vercel.
3. En Vercel, cambia `NEXT_PUBLIC_SITE_URL` a `https://app.anunciofacil.es` y haz **Redeploy**.
4. En Supabase, ve a **URL Configuration**: cambia la **Site URL** y añade `https://app.anunciofacil.es/auth/callback`.
5. En tu web `anunciofacil.es`, haz que «Iniciar sesión» lleve a la app.

## 6. Correo propio para los enlaces de acceso (antes de tener muchos clientes)
El correo que trae Supabase solo envía unos pocos mensajes por hora. Crea una cuenta gratis en **Resend** o **Brevo** y configúrala en Supabase, en **Authentication** → **SMTP Settings**. Te guío cuando llegues aquí.

## 7. Textos legales
Completa lo que está entre corchetes en `/privacidad` y `/terminos`: NIF, dirección y fecha. Pídeme que lo ponga. Conviene que lo revise alguien que sepa de temas legales.

---

## 8. Cobros con Stripe (con un adulto: DNI y cuenta bancaria)
1. Crea la cuenta en **stripe.com** y empieza en **modo prueba**.
2. Crea dos productos, los dos **recurrentes, mensuales y con impuestos incluidos**:
   - **Anuncio Fácil**, 9,99 EUR. Su ID de precio va en `STRIPE_PRICE_ID`.
   - **Anuncio Fácil Pro**, 35 EUR. Su ID de precio va en `STRIPE_PRICE_ID_PRO`.
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
1. En Vercel, añade `APP_OPEN` con el valor `true` y haz **Redeploy**. Desde ese momento la gente ya puede registrarse.
2. Mientras `FREE_LAUNCH=true`, todos lo usan **gratis**, con 10 generaciones al mes.
3. Envía el **correo de lanzamiento** a tu lista de espera. Está en `LANZAMIENTO.md`.
4. Pídeme que cambie los botones de la web de la lista de espera para que lleven a la app.

## 11. Al llegar a tu meta secreta (`LAUNCH_GOAL`)
1. Tu `/admin` te avisa cuando llegues.
2. Envía el **correo de aviso** de que pasa a ser de pago, con 30 días de antelación. Está en `LANZAMIENTO.md`.
3. 30 días después, pon `FREE_LAUNCH` en `false` en Vercel y haz **Redeploy**. Desde entonces se cobra.
