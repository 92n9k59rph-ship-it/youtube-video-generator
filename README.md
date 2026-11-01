# youtube-video-generator
Automated YouTube video generator with script, voiceover, subtitles, and export workflow.

Este repositorio tiene tres partes:

| Carpeta | Qué es |
|---|---|
| `.claude/`, `plantillas/`, `proyectos/` | El **agente productor de vídeos para YouTube** y los vídeos ya preparados |
| `anunciafacil/` | **Anuncio Fácil**, la app de marketing para negocios (con suscripción) |
| `docs/` y `web/anunciafacil/` | La **web de la lista de espera** de Anuncio Fácil (publicada con GitHub Pages) |

## Agente productor de vídeos (Claude Code)

Convierte cualquier tema en un paquete de producción listo para editar:
- enfoque y público, 5 títulos y guion por escenas;
- narración para voz artificial y prompts visuales;
- música y efectos con licencia, y subtítulos SRT;
- miniatura y descripción optimizada;
- checklist de CapCut para iPad, revisión de calidad y versión Shorts.

| Archivo | Uso |
|---|---|
| `.claude/agents/productor-youtube.md` | Definición del subagente `productor-youtube` |
| `CLAUDE.md` | Hace que cualquier sesión en este repo siga ese flujo |
| `plantillas/plantilla-produccion.md` | Estructura de cada entrega |
| `proyectos/` | Una carpeta por vídeo: dinosaurios, Pompón en Marte y la marioneta (experimento de Asch) |

### Cómo usarlo

Abre Claude Code en este repositorio y escribe, por ejemplo:

> Hazme un vídeo sobre la historia del café, 8 minutos, estilo documental cinematográfico.

Si falta el tema, la duración o el estilo visual, el agente te los preguntará primero.

El agente entrega textos, guiones y prompts: **no genera ni exporta vídeo por sí mismo**. Los datos que no pueda verificar aparecen marcados con `⚠️ VERIFICAR:`.

## Anuncio Fácil

Aplicación web (Next.js + Supabase + Stripe + API de Claude) que escribe textos de marketing para negocios pequeños:
- publicaciones para redes con idea de Reel y calendario;
- correos para clientes;
- respuestas a reseñas de Google;
- mensajes de WhatsApp;
- textos para carteles y menús;
- respuestas a mensajes de clientes.

Empieza en **modo lanzamiento gratis por tiempo limitado** (10 generaciones al mes por negocio). Después tendrá dos planes con Stripe: **Básico**, 9,99 €/mes con 50 generaciones, y **Pro**, 35 €/mes con 200 generaciones y todas las herramientas. Mientras `APP_OPEN` no sea `true`, la web se ve entera pero solo el administrador puede usarla. Incluye panel del cliente con historial, borrado de cuenta y panel de administración (`/admin`).

- **Ponerla en marcha:** `anunciafacil/GUIA.md`, paso a paso y desde el iPad.
- **Lo que falta para terminar:** `anunciafacil/PASOS-FINALES.md` (con detalle: `anunciafacil/GUIA-PASOS.md`)
- **Textos para el lanzamiento:** `anunciafacil/LANZAMIENTO.md`
- **Plan para conseguir los primeros clientes:** `anunciafacil/MARKETING.md`
- **Base de datos:** `anunciafacil/supabase/schema.sql`
