import { describe, expect, it } from "vitest";
import {
  BioSchema,
  EmailSchema,
  GoogleSchema,
  LoyaltySchema,
  PosterSchema,
  PromoSchema,
  ReelSchema,
  ReviewSchema,
  SocialSchema,
  WhatsappSchema,
} from "@/lib/generator";

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

  it("acepta las herramientas nuevas completas", () => {
    expect(
      BioSchema.safeParse({
        profile_name: "Bar Pepe · Tapas",
        bios: [{ style: "cercana", text: "Tapas de siempre 🍤" }],
        highlights: ["Carta"],
        link_text: "Reserva aquí",
        tips: [],
      }).success,
    ).toBe(true);
    expect(
      GoogleSchema.safeParse({
        description: "Bar de tapas",
        keywords: ["bar de tapas en [barrio]"],
        posts: [{ kind: "oferta", title: "Martes", text: "Texto", button: "Reservar" }],
        faqs: [{ question: "¿Tenéis terraza?", answer: "Sí" }],
        tips: [],
      }).success,
    ).toBe(true);
    expect(
      PromoSchema.safeParse({
        name: "Martes de tapas",
        key_message: "Ven el martes",
        offer: "2x1",
        plan: [{ day: "Día 1", channel: "Instagram", action: "Publicar" }],
        social_posts: [{ caption: "¡Martes!", hashtags: ["#tapas"] }],
        email: { subject: "Martes", body: "Hola" },
        whatsapp: "Hola",
        poster: { headline: "2x1", subheadline: "Martes", call_to_action: "Ven" },
        measure: ["Contar clientes"],
      }).success,
    ).toBe(true);
    expect(
      ReelSchema.safeParse({
        title: "Tarta",
        hooks: ["Mira esto"],
        duration_seconds: 20,
        shots: [{ seconds: "0-3 s", visual: "Tarta", voice: "", on_screen_text: "Nueva" }],
        subtitles: "Hola",
        caption: "Tarta",
        hashtags: ["#tarta"],
        cover_text: "Tarta nueva",
        music_mood: "Alegre",
        tips: [],
      }).success,
    ).toBe(true);
    expect(
      LoyaltySchema.safeParse({
        ideas: [{ name: "Sellos", how: "10 cafés", pros: "Fácil", cons: "Papel" }],
        rules: ["Un sello por café"],
        announcements: [{ channel: "Cartel", text: "¡Pide tu tarjeta!" }],
        legal_checks: ["Bases del sorteo"],
      }).success,
    ).toBe(true);
  });
});
