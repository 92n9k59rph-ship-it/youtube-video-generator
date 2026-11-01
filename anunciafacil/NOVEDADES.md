# Novedades de Pregonia

## 1 de noviembre

### Para tus clientes
- **Nuevo nombre: Pregonia.** «Anuncio Fácil» ya lo usaba otra web.
- **Tres planes:** Básico, 15 € al mes (60 generaciones); Pro, 40 € al mes (200); y Premium, 55 € al mes (400 y todo incluido).
- **Cinco herramientas nuevas para conseguir clientes:**
  - **Perfil de redes** (Básico): biografía de Instagram y TikTok.
  - **Ficha de Google** (Pro): para salir en las búsquedas de tu zona.
  - **Campaña completa** (Premium): una oferta en todos los canales a la vez.
  - **Guion de vídeo** (Premium): para Reels, TikTok y Shorts.
  - **Fidelizar clientes** (Premium): tarjetas de puntos, sorteos y ventajas.
- **Buscador del historial** y **descarga del historial** en CSV (Premium).
- **Su propia app:** se instala en el móvil, la tablet o el ordenador desde la web.
- **Textos legales completos** y casilla de «empezar ya» antes de pagar.

### Para ti
- En Stripe hay que crear tres productos (15, 40 y 55 €) y poner `STRIPE_PRICE_ID`, `STRIPE_PRICE_ID_PRO` y `STRIPE_PRICE_ID_PREMIUM` en Vercel.
- En `/admin` ves cuántos clientes tienes en cada plan.

## 30 de octubre

### Para tus clientes
- **Gratis por tiempo limitado:** hasta 10 generaciones al mes, sin tarjeta. La meta de negocios es secreta: solo está en Vercel (`LAUNCH_GOAL`) y en tu `/admin`.
- **Cinco herramientas:** redes sociales, correos, respuestas a reseñas, WhatsApp y carteles o menús.
- **Historial:** se pueden volver a abrir los textos antiguos.
- **«Copiar todas»** las publicaciones de golpe.
- **«Recomiéndalo a otro negocio»:** un botón para compartirlo por WhatsApp o copiar el enlace.
- **«¿Qué te parece?»:** los clientes dejan su opinión, y tú la lees en `/admin`.
- **«Borrar mi cuenta»:** el propio cliente lo hace, como exige la ley de protección de datos.
- **Páginas de error en español,** icono propio y vista previa bonita al compartir el enlace.

### Para ti
- **Panel `/admin`:** clientes, suscriptores, ingresos estimados, coste de la IA, uso por herramienta, opiniones y progreso hacia tu meta secreta.
- **Protección de gastos:** nadie puede saltarse el límite de usos aunque pulse «Generar» muchas veces a la vez. Está probado con 10 peticiones simultáneas.
- **CAPTCHA opcional** contra cuentas falsas (Cloudflare Turnstile).
- **Plan de marketing** en `MARKETING.md`.
- **Textos de lanzamiento** en `LANZAMIENTO.md`: el correo de lanzamiento y el aviso de paso a pago.

### Calidad
- **13 pruebas automáticas** (`npm test`).
- **Comprobación automática en GitHub** en cada cambio: tipos, pruebas y compilación.
- **Arreglado un fallo que habría roto la publicación en Vercel:** la carpeta `lib/` no se subía a GitHub por el `.gitignore` de la raíz.

### Lo que tienes que hacer tú
1. En Supabase → **SQL Editor**, pega y ejecuta `supabase/actualizacion-1.sql`. Añade la protección de usos y la tabla de opiniones.
2. Sigue con la `GUIA.md`: Anthropic y Vercel. Stripe no hace falta mientras dure el lanzamiento gratis.
