# youtube-video-generator
Automated YouTube video generator with script, voiceover, subtitles, and export workflow.

## Agente productor de vídeos (Claude Code)

El repositorio incluye un agente que convierte cualquier tema en un paquete de producción
listo para editar: enfoque y público, 5 títulos, guion por escenas, narración para voz
artificial, prompts visuales, música y SFX con licencia, subtítulos SRT, miniatura,
descripción optimizada, checklist de CapCut para iPad, revisión de calidad y versión Shorts.

| Archivo | Uso |
|---|---|
| `.claude/agents/productor-youtube.md` | Definición del subagente `productor-youtube` |
| `CLAUDE.md` | Hace que cualquier sesión en este repo siga ese flujo |
| `plantillas/plantilla-produccion.md` | Estructura de cada entrega |
| `proyectos/` | Aquí se guarda cada producción (`proyectos/<tema>/`) |

### Cómo usarlo

Abre Claude Code en este repositorio y escribe, por ejemplo:

> Hazme un vídeo sobre la historia del café, 8 minutos, estilo documental cinematográfico.

Si falta el tema, la duración o el estilo visual, el agente te los preguntará primero.

El agente entrega textos, guiones y prompts: **no genera ni exporta vídeo por sí mismo**.
Los datos que no pueda verificar aparecen marcados con `⚠️ VERIFICAR:`.
