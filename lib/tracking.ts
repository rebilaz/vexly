"use client";

const TRACK_ENDPOINT =
  "https://jnkbqwqzatlrcpqwdlim.supabase.co/functions/v1/dynamic-handler";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("📄 [tracking.ts] Chargé");
console.log("🔗 [tracking.ts] TRACK_ENDPOINT =", TRACK_ENDPOINT);
console.log("🔑 [tracking.ts] SUPABASE_ANON_KEY défini ? ", !!SUPABASE_ANON_KEY);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1] ?? null;

  console.log(`[cookie] getCookie("${name}") →`, cookie);
  return cookie;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  const KEY = "sess_id";
  const existing = window.localStorage.getItem(KEY);

  if (existing && existing.length > 0) {
    console.log("🟩 [tracking] Session ID existant :", existing);
    return existing;
  }

  const generated =
    (crypto as any)?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  console.log("🟦 [tracking] Nouveau Session ID généré :", generated);
  window.localStorage.setItem(KEY, generated);

  return generated;
}

function getUtmAndCampaignParams() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const get = (k: string) => url.searchParams.get(k) || undefined;

  const utm = {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    campaign_id: get("campaign_id"),
    adset_id: get("adset_id"),
    ad_id: get("ad_id"),
    post_id: get("post_id"),
    fbclid: get("fbclid"),
  };

  console.log("🟪 [tracking] UTM détectés :", utm);
  return utm;
}

export type ExtraTrackingData = {
  scroll_pct?: number | null;
  source?: string;
};

export async function trackEvent(
  event_name: string,
  value: number,
  extra: ExtraTrackingData = {},
) {
  console.log(`\n🚨 [trackEvent] DÉBUT - "${event_name}"`);

  if (typeof window === "undefined") {
    console.warn("⛔ [trackEvent] Ignoré (pas de window)");
    return;
  }

  // --- Vérification FBC ---
  const fbc = getCookie("_fbc");
  const fbp = getCookie("_fbp");
  console.log("🔍 [trackEvent] fbc =", fbc, "fbp =", fbp);

  if (!fbc) {
    console.warn(`⛔ [trackEvent] Annulé : "_fbc" manquant pour "${event_name}"`);
    return;
  }

  try {
    const url = window.location.href;
    const referrer = document.referrer || null;
    const session_id = getOrCreateSessionId();
    const utm = getUtmAndCampaignParams();

    const body = {
      event_name,
      value,
      url,
      referrer,
      scroll_pct: extra.scroll_pct ?? null,
      session_id,
      fbc,
      fbp,
      ...utm,
      source: extra.source ?? undefined,
    };

    console.log("📦 [trackEvent] Body final envoyé :", body);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (SUPABASE_ANON_KEY) {
      headers["Authorization"] = `Bearer ${SUPABASE_ANON_KEY}`;
    } else {
      console.warn("⚠️ [trackEvent] ANON_KEY manquant → risque de 401");
    }

    console.log("📤 [trackEvent] Envoi vers :", TRACK_ENDPOINT);
    console.log("📨 Headers :", headers);

    fetch(TRACK_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      keepalive: true,
    })
      .then((res) => {
        console.log(`🟦 [trackEvent] Réponse serveur (${res.status})`);
        return res.text();
      })
      .then((txt) => {
        console.log("🟫 [trackEvent] Contenu brut de la réponse :", txt);
      })
      .catch((err) => {
        console.error("🔥 [trackEvent] Erreur lors du fetch :", err);
      });
  } catch (e) {
    console.error("💥 [trackEvent] Exception :", e);
  }
}

let pageTrackingInit = false;

export function setupPageTracking() {
  console.log("\n🟩 [setupPageTracking] Appel");

  if (pageTrackingInit || typeof window === "undefined") {
    console.warn("⛔ [setupPageTracking] déjà initialisé ou hors navigateur");
    return;
  }

  pageTrackingInit = true;
  console.log("🚀 [setupPageTracking] Initialisation du tracking de page");

  trackEvent("PageView", 1);

  let strongSent = false;

  const sendStrong = (scroll_pct: number | null) => {
    if (strongSent) return;
    strongSent = true;

    console.log(
      `💪 [setupPageTracking] PageView fort envoyé (scroll_pct: ${scroll_pct})`,
    );

    trackEvent("PageView", 3, { scroll_pct });
  };

  setTimeout(() => sendStrong(null), 10_000);

  window.addEventListener("scroll", () => {
    const scrollPercent =
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) *
      100;

    console.log("📏 [scroll] Pourcentage scroll =", scrollPercent);

    if (scrollPercent >= 50) {
      sendStrong(Math.round(scrollPercent));
    }
  });
}
