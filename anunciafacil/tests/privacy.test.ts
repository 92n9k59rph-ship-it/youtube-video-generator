import { describe, expect, it } from "vitest";
import { canSeeSite, isAlwaysOpen } from "@/lib/privacy";

const base = { sitePublic: false, path: "/", isAdmin: false, previewCode: undefined, previewCookie: undefined };

describe("web en privado", () => {
  it("por defecto, la gente no ve la web", () => {
    expect(canSeeSite(base)).toBe(false);
    expect(canSeeSite({ ...base, path: "/terminos" })).toBe(false);
    expect(canSeeSite({ ...base, path: "/panel" })).toBe(false);
  });

  it("los administradores sí la ven", () => {
    expect(canSeeSite({ ...base, isAdmin: true })).toBe(true);
  });

  it("con el código de vista previa correcto se ve; con otro, no", () => {
    expect(canSeeSite({ ...base, previewCode: "secreto", previewCookie: "secreto" })).toBe(true);
    expect(canSeeSite({ ...base, previewCode: "secreto", previewCookie: "otro" })).toBe(false);
  });

  it("sin código configurado, una cookie vacía no abre nada", () => {
    expect(canSeeSite({ ...base, previewCode: "", previewCookie: "" })).toBe(false);
    expect(canSeeSite({ ...base, previewCode: undefined, previewCookie: undefined })).toBe(false);
  });

  it("con SITE_PUBLIC=true la ve todo el mundo", () => {
    expect(canSeeSite({ ...base, sitePublic: true })).toBe(true);
  });

  it("entrar, el acceso, la API y los archivos de la app siempre se pueden abrir", () => {
    for (const path of ["/muy-pronto", "/entrar", "/auth/callback", "/api/generar", "/manifest.webmanifest", "/icon-192.png", "/apple-icon.png"]) {
      expect(isAlwaysOpen(path)).toBe(true);
    }
    for (const path of ["/", "/panel", "/admin", "/precios", "/terminos"]) {
      expect(isAlwaysOpen(path)).toBe(false);
    }
  });
});
