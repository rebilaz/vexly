// components/saas/seo-mindmap/mindmap-canvas/render.ts
import type { MindMapNode, MindMapType } from "../mindmap.types";
import { LINK_STYLE, TYPE_COLOR, TYPE_LABEL } from "./theme";

function uiScale(globalScale: number) {
    return 1 / Math.max(globalScale, 1);
}

function riskColor(risk?: string) {
    if (risk === "danger") return "rgba(239,68,68,1)";   // red-500
    if (risk === "warn") return "rgba(245,158,11,1)";    // amber-500
    return "rgba(34,197,94,1)";                          // green-500
}

function riskLabel(risk?: string) {
    if (risk === "danger") return "RISK";
    if (risk === "warn") return "WARN";
    return "OK";
}

export function drawNode(node: any, ctx: CanvasRenderingContext2D, globalScale: number) {
    const n = node as MindMapNode;
    const x = n.x ?? n.fx ?? 0;
    const y = n.y ?? n.fy ?? 0;

    const u = uiScale(globalScale);

    const padX = 22 * u;
    const padY = 18 * u;
    const radius = 22 * u;

    const titleFont = clamp(18 * u, 14, 20);
    const smallFont = clamp(12 * u, 10, 13);

    const iconBox = 44 * u;
    const iconR = 14 * u;

    const typeLabel = TYPE_LABEL[n.type].toUpperCase();

    // show indegree + depth in the card
    const indeg = n.in_degree ?? 0;
    const depth = n.depth_bfs == null ? "∞" : String(n.depth_bfs);

    // measure title
    ctx.font = `900 ${titleFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    const titleW = ctx.measureText(n.label).width;

    ctx.font = `800 ${smallFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    const typeW = ctx.measureText(typeLabel).width;

    const rightMeta = `In: ${indeg} • D: ${depth}`;
    const rightMetaW = ctx.measureText(rightMeta).width;

    const riskText = riskLabel(n.risk);
    const riskW = ctx.measureText(riskText).width;

    const contentW = Math.max(titleW, typeW + 14 * u + riskW + 34 * u, rightMetaW);
    const w = padX + iconBox + 14 * u + contentW + padX;
    const h = Math.max(92 * u, padY * 2 + titleFont + smallFont + 22 * u);

    n._w = w;
    n._h = h;

    const left = x - w / 2;
    const top = y - h / 2;

    // shadow
    ctx.save();
    ctx.shadowColor = "rgba(2,6,23,0.08)";
    ctx.shadowBlur = 20 * u;
    ctx.shadowOffsetY = 8 * u;

    roundRect(ctx, left, top, w, h, radius);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();

    // border (risk tinted)
    ctx.save();
    ctx.lineWidth = 1.1 * u;
    ctx.strokeStyle = "rgba(148,163,184,0.55)";
    roundRect(ctx, left, top, w, h, radius);
    ctx.stroke();
    ctx.restore();

    // left dot = risk (most important)
    ctx.save();
    ctx.fillStyle = riskColor(n.risk);
    ctx.beginPath();
    ctx.arc(left + 10 * u, top + h / 2, 5.6 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // icon box (keep type color)
    const accent = TYPE_COLOR[n.type];
    const boxX = left + padX;
    const boxY = top + (h - iconBox) / 2;

    ctx.save();
    roundRect(ctx, boxX, boxY, iconBox, iconBox, iconR);
    ctx.fillStyle = pastelFill(n.type);
    ctx.fill();
    ctx.restore();

    drawGlyph(ctx, boxX + iconBox / 2, boxY + iconBox / 2, n.type, u, accent);

    // text block
    const textX = boxX + iconBox + 14 * u;
    const topRowY = top + 28 * u;
    const titleY = top + h / 2 + 4 * u;
    const metaY = top + h - 26 * u;

    // type label
    ctx.save();
    ctx.font = `900 ${smallFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    ctx.fillStyle = "rgba(100,116,139,0.95)";
    ctx.fillText(typeLabel, textX, topRowY);

    // risk pill (right after type)
    const pillX = textX + typeW + 10 * u;
    const pillH = 22 * u;
    const pillPadX = 10 * u;
    const pillW = riskW + pillPadX * 2;

    roundRect(ctx, pillX, topRowY - pillH / 2, pillW, pillH, 999 * u);
    ctx.fillStyle = "rgba(241,245,249,1)";
    ctx.fill();
    ctx.lineWidth = 1 * u;
    ctx.strokeStyle = "rgba(226,232,240,1)";
    ctx.stroke();

    ctx.fillStyle = "rgba(15,23,42,0.9)";
    ctx.fillText(riskText, pillX + pillPadX, topRowY);
    ctx.restore();

    // title
    ctx.save();
    ctx.font = `950 ${titleFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    ctx.fillStyle = "#0f172a";
    ctx.fillText(n.label, textX, titleY);
    ctx.restore();

    // meta (in-degree & depth)
    ctx.save();
    ctx.font = `800 ${smallFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    ctx.fillStyle = "rgba(100,116,139,0.95)";
    ctx.fillText(rightMeta, textX, metaY);
    ctx.restore();

    // chevron outside
    const cR = 14 * u;
    const cx = left + w + 18 * u;
    const cy = top + h / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, cR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(248,250,252,1)";
    ctx.fill();
    ctx.lineWidth = 1 * u;
    ctx.strokeStyle = "rgba(226,232,240,1)";
    ctx.stroke();

    ctx.strokeStyle = "rgba(100,116,139,0.95)";
    ctx.lineWidth = 2.2 * u;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(cx - 3.5 * u, cy - 5 * u);
    ctx.lineTo(cx + 3.5 * u, cy);
    ctx.lineTo(cx - 3.5 * u, cy + 5 * u);
    ctx.stroke();
    ctx.restore();
}

export function drawLink(link: any, ctx: CanvasRenderingContext2D, globalScale: number) {
    const s = link.source as MindMapNode;
    const t = link.target as MindMapNode;

    const sx = (s.x ?? s.fx ?? 0) as number;
    const sy = (s.y ?? s.fy ?? 0) as number;
    const tx = (t.x ?? t.fx ?? 0) as number;
    const ty = (t.y ?? t.fy ?? 0) as number;

    const u = uiScale(globalScale);

    const w = clamp(Math.max(1, (link.weight ?? 1) * 0.95) * u, 0.9, 2.0);
    const midX = (sx + tx) / 2;

    const dashed = LINK_STYLE.dashLongtail && ((t as any).type as MindMapType) === "longtail";

    ctx.save();
    ctx.strokeStyle = "rgba(148,163,184,0.55)";
    ctx.lineWidth = w;
    if (dashed) ctx.setLineDash([8 * u, 8 * u]);

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(midX, sy);
    ctx.lineTo(midX, ty);
    ctx.lineTo(tx, ty);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.restore();
}

// ===== helpers =====
function pastelFill(type: MindMapNode["type"]) {
    if (type === "pillar") return "rgba(220,252,231,0.85)";
    if (type === "content") return "rgba(219,234,254,0.85)";
    if (type === "strategic") return "rgba(226,232,240,0.9)";
    return "rgba(241,245,249,0.9)";
}

function drawGlyph(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    type: MindMapNode["type"],
    u: number,
    color: string
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.2 * u;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (type === "strategic") {
        ctx.beginPath();
        ctx.moveTo(cx - 10 * u, cy + 4 * u);
        ctx.lineTo(cx - 10 * u, cy - 2 * u);
        ctx.lineTo(cx, cy - 10 * u);
        ctx.lineTo(cx + 10 * u, cy - 2 * u);
        ctx.lineTo(cx + 10 * u, cy + 4 * u);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 4.5 * u, cy + 4 * u);
        ctx.lineTo(cx - 4.5 * u, cy - 1 * u);
        ctx.lineTo(cx + 4.5 * u, cy - 1 * u);
        ctx.lineTo(cx + 4.5 * u, cy + 4 * u);
        ctx.stroke();
    } else if (type === "pillar") {
        ctx.beginPath();
        ctx.moveTo(cx - 9 * u, cy);
        ctx.lineTo(cx + 9 * u, cy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 9 * u);
        ctx.lineTo(cx, cy + 9 * u);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5 * u, 0, Math.PI * 2);
        ctx.stroke();
    } else if (type === "content") {
        roundRect(ctx, cx - 10 * u, cy - 12 * u, 20 * u, 24 * u, 6 * u);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 6 * u, cy - 2 * u);
        ctx.lineTo(cx + 6 * u, cy - 2 * u);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 6 * u, cy + 4 * u);
        ctx.lineTo(cx + 3 * u, cy + 4 * u);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.arc(cx - 6 * u, cy, 2.2 * u, 0, Math.PI * 2);
        ctx.arc(cx, cy, 2.2 * u, 0, Math.PI * 2);
        ctx.arc(cx + 6 * u, cy, 2.2 * u, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
    return ctx;
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}
