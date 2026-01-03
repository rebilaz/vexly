// components/fit-form/types.ts
export type BudgetBand = "<500" | "500-1500" | "1500-5000" | "5000+";

export type Offer =
  | "KICKSTARTER"
  | "BRANDING"
  | "MVP"
  | "EXIT_LOW_BUDGET"
  | "EXIT_NOT_READY";

export type FormData = {
  // Step 1 — Filtre
  fullName: string;
  email: string;
  companyOrProject: string;
  website?: string;
  budget: BudgetBand;
  deadline: "ASAP" | "2-4W" | "1-2M" | "3M+";
  seriousness: "READY" | "EXPLORING";

  // Step 2 — Aiguillage
  needCustom: "YES" | "NO";
  brandingNeeded: "YES" | "NO"; // uniquement si needCustom=NO

  // Step 3 — Architecte
  problem: string;
  targetUsers: string;
  userStories: string;
  integrations: string;
  authRoles: string;
  dataEntities: string;
  excluded: string;
  designLink?: string;
  referenceLinks?: string;

  // WhatsApp
  whatsappPreferred: "YES" | "NO";
  whatsappNumber?: string;
};

export const DEFAULT_DATA: FormData = {
  fullName: "",
  email: "",
  companyOrProject: "",
  website: "",
  budget: "500-1500",
  deadline: "2-4W",
  seriousness: "READY",

  needCustom: "NO",
  brandingNeeded: "YES",

  problem: "",
  targetUsers: "",
  userStories: "",
  integrations: "",
  authRoles: "",
  dataEntities: "",
  excluded: "",
  designLink: "",
  referenceLinks: "",

  whatsappPreferred: "NO",
  whatsappNumber: "",
};
