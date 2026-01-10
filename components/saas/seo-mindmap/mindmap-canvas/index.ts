// components/saas/seo-mindmap/mindmap-canvas/index.ts
export { layoutColumns } from "./layout";
export { drawNode, drawLink } from "./render";
export { CANVAS_STYLE } from "./theme";

export function createDottedBg() {
    const el = document.createElement("canvas");
    el.width = 24;
    el.height = 24;
    const ctx = el.getContext("2d")!;
    ctx.fillStyle = "rgba(148,163,184,0.22)";
    ctx.beginPath();
    ctx.arc(2, 2, 1.2, 0, Math.PI * 2);
    ctx.fill();
    return el;
}
