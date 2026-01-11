// components/saas/seo-mindmap/mindmap-canvas/theme.ts
import type { MindMapType } from "../mindmap.types";

export const TYPE_COLOR: Record<MindMapType, string> = {
    strategic: "#0f172a",
    pillar: "#16a34a",
    content: "#2563eb",
    longtail: "#94a3b8",
};

export const TYPE_LABEL: Record<MindMapType, string> = {
    strategic: "Strategy",
    pillar: "Pilier",
    content: "Cluster",
    longtail: "Longtail",
};

export const CANVAS_STYLE = {
    bgColor: "#f8fafc",
    dotColor: "rgba(148,163,184,0.22)",
};

// ✅ plus compact
export const LAYOUT = {
    colGap: 560,  // un peu moins large
    rowGap: 118,  // ✅ rapproche verticalement
    groupGap: 34, // ✅ rapproche entre catégories
};
export const LINK_STYLE = {
    stroke: "rgba(148,163,184,0.75)",
    dashLongtail: true,
};
