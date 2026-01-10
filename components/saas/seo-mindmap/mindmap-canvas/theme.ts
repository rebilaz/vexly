// components/saas/seo-mindmap/mindmap-canvas/theme.ts
import type { MindMapType } from "../mindmap.types";

export const TYPE_COLOR: Record<MindMapType, string> = {
    strategic: "#0f172a",
    pillar: "#059669",
    content: "#2563eb",
    longtail: "#94a3b8",
};

export const TYPE_LABEL: Record<MindMapType, string> = {
    strategic: "Stratégique",
    pillar: "Pilier",
    content: "Cluster",
    longtail: "Longue traîne",
};

export const CANVAS_STYLE = {
    bgColor: "#f8fafc",
    dotColor: "rgba(148,163,184,0.22)",
};

export const LAYOUT = {
    colGap: 540,
    rowGap: 110,
    groupGap: 40,
};

export const LINK_STYLE = {
    stroke: "rgba(148,163,184,0.75)",
    dashLongtail: true,
};
