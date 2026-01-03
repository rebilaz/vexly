// components/fit-form/logic.ts
import type { FormData, Offer } from "./types";

export function computeOffer(d: FormData): Offer {
  if (d.seriousness === "EXPLORING") return "EXIT_NOT_READY";
  if (d.budget === "<500") return "EXIT_LOW_BUDGET";
  if (d.needCustom === "YES") return "MVP";
  if (d.brandingNeeded === "YES") return "BRANDING";
  return "KICKSTARTER";
}

export function stripeLinkFor(offer: Offer) {
  // ⚠️ Remplace par tes liens Stripe Checkout
  switch (offer) {
    case "KICKSTARTER":
      return "https://checkout.stripe.com/pay/REPLACE_KICKSTARTER";
    case "BRANDING":
      return "https://checkout.stripe.com/pay/REPLACE_BRANDING";
    case "MVP":
      return "https://checkout.stripe.com/pay/REPLACE_MVP";
    default:
      return "";
  }
}

export function labelForOffer(offer: Offer) {
  switch (offer) {
    case "KICKSTARTER":
      return "Kickstarter (490€)";
    case "BRANDING":
      return "SaaS Branding (1 490€)";
    case "MVP":
      return "MVP Builder (3 990€)";
    case "EXIT_LOW_BUDGET":
      return "Hors cadre (budget)";
    case "EXIT_NOT_READY":
      return "Trop tôt (exploration)";
    default:
      return "—";
  }
}

export function canGoStep2(d: FormData) {
  return (
    d.fullName.trim().length >= 2 &&
    d.email.includes("@") &&
    d.companyOrProject.trim().length >= 2 &&
    !!d.budget &&
    !!d.deadline &&
    !!d.seriousness
  );
}

export function canGoStep3(d: FormData) {
  return d.needCustom === "YES" || (d.needCustom === "NO" && !!d.brandingNeeded);
}

export function canSubmit(d: FormData, offer: Offer) {
  if (offer === "EXIT_LOW_BUDGET" || offer === "EXIT_NOT_READY") return true;

  return (
    d.problem.trim().length >= 20 &&
    d.targetUsers.trim().length >= 10 &&
    d.userStories.trim().length >= 30 &&
    d.integrations.trim().length >= 5 &&
    d.authRoles.trim().length >= 5 &&
    d.dataEntities.trim().length >= 5 &&
    d.excluded.trim().length >= 10
  );
}
