import { describe, expect, it } from "vitest";
import { EmailSchema, PosterSchema, ReviewSchema, SocialSchema, WhatsappSchema } from "@/lib/generator";

describe("formato de las respuestas de la IA", () => {
  it("acepta una respuesta de redes sociales completa", () => {
    const ok = SocialSchema.safeParse({
      posts: [{ title: "Tapa", caption: "¡Hoy croquetas!", hashtags: ["#tapas"], image_idea: "Foto", best_day: "Viernes" }],
      reel: { hook: "Croquetas", shots: ["Plano 1"], on_screen_text: "Viernes", duration_seconds: 15, music_mood: "Alegre" },
      calendar: [{ when: "Semana 1 · lunes", idea: "Foto del equipo" }],
      tips: ["Publica por la tarde"],
    });
    expect(ok.success).toBe(true);
  });

  it("rechaza respuestas incompletas", () => {
    expect(SocialSchema.safeParse({ posts: [] }).success).toBe(false);
    expect(EmailSchema.safeParse({ subjects: ["Hola"] }).success).toBe(false);
    expect(ReviewSchema.safeParse({ replies: [] }).success).toBe(false);
    expect(WhatsappSchema.safeParse({}).success).toBe(false);
    expect(PosterSchema.safeParse({ options: [{ headline: "Rebajas" }] }).success).toBe(false);
  });
});
