// components/saas/seo-mindmap/mindmap-canvas/render.ts
import type { MindMapNode, MindMapType } from "../mindmap.types";
import { LINK_STYLE, TYPE_COLOR, TYPE_LABEL } from "./theme";

function uiScale(globalScale: number) {
    return 1 / Math.max(globalScale, 1);
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

function riskColor(risk?: string) {
    if (risk === "danger") return "rgba(239,68,68,1)";
    if (risk === "warn") return "rgba(245,158,11,1)";
    return "rgba(34,197,94,1)";
}

function riskLabel(risk?: string) {
    if (risk === "danger") return "RISK";
    if (risk === "warn") return "WARN";
    return "OK";
}

function typePillBg(type: MindMapNode["type"]) {
    if (type === "strategic") return "rgba(226,232,240,1)";
    if (type === "pillar") return "rgba(220,252,231,1)";
    if (type === "content") return "rgba(219,234,254,1)";
    return "rgba(241,245,249,1)";
}

function typePillText(type: MindMapNode["type"]) {
    if (type === "strategic") return "rgba(15,23,42,0.9)";
    if (type === "pillar") return "rgba(22,101,52,0.95)";
    if (type === "content") return "rgba(30,64,175,0.95)";
    return "rgba(100,116,139,0.95)";
}

export function drawNode(node: any, ctx: CanvasRenderingContext2D, globalScale: number) {
    const n = node as MindMapNode;
    const x = n.x ?? n.fx ?? 0;
    const y = n.y ?? n.fy ?? 0;
    const u = uiScale(globalScale);

    const W = 320 * u;
    const H = 96 * u;
    const R = 18 * u;

    n._w = W;
    n._h = H;

    const left = x - W / 2;
    const top = y - H / 2;

    // shadow + card
    ctx.save();
    ctx.shadowColor = "rgba(2,6,23,0.07)";
    ctx.shadowBlur = 18 * u;
    ctx.shadowOffsetY = 8 * u;

    roundRect(ctx, left, top, W, H, R);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();

    // border
    ctx.save();
    ctx.lineWidth = 1 * u;
    ctx.strokeStyle = "rgba(226,232,240,1)";
    roundRect(ctx, left, top, W, H, R);
    ctx.stroke();
    ctx.restore();

    // ✅ LEFT category bar (group color)
    const gcol = n._groupColor ?? "rgba(148,163,184,0.9)";
    ctx.save();
    roundRect(ctx, left + 1 * u, top + 10 * u, 6 * u, H - 20 * u, 999 * u);
    ctx.fillStyle = gcol;
    ctx.fill();
    ctx.restore();

    // risk dot (top-left)
    ctx.save();
    ctx.fillStyle = riskColor(n.risk);
    ctx.beginPath();
    ctx.arc(left + 14 * u, top + 18 * u, 4.2 * u, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const headerFont = clamp(11 * u, 9, 12);
    const titleFont = clamp(16 * u, 12, 16);
    const smallFont = clamp(11 * u, 9, 11);

    // ✅ GROUP pill (top-left after dot)
    const groupText = (n._groupLabel ?? "").toUpperCase();
    if (groupText) {
        ctx.save();
        ctx.font = `900 ${headerFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
        const gw = ctx.measureText(groupText).width;

        const pillH = 20 * u;
        const padX = 9 * u;
        const pillW = gw + padX * 2;

        const gx = left + 24 * u;
        const gy = top + 18 * u;

        roundRect(ctx, gx, gy - pillH / 2, pillW, pillH, 999 * u);
        ctx.fillStyle = "rgba(241,245,249,1)";
        ctx.fill();
        ctx.strokeStyle = "rgba(226,232,240,1)";
        ctx.lineWidth = 1 * u;
        ctx.stroke();

        ctx.fillStyle = gcol;
        ctx.fillText(groupText, gx + padX, gy + 0.5 * u);
        ctx.restore();
    }

    // TYPE pill (top row)
    const typeText = (TYPE_LABEL[n.type] ?? n.type).toUpperCase();
    const score = typeof n.in_degree === "number" ? n.in_degree : 0;

    ctx.save();
    ctx.font = `900 ${headerFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    const typeW = ctx.measureText(typeText).width;

    const pillH = 20 * u;
    const pillPadX = 10 * u;
    const pillW = typeW + pillPadX * 2;

    const pillX = left + 24 * u + (groupText ? (ctx.measureText(groupText).width + 34 * u) : 0);
    const pillY = top + 18 * u;

    roundRect(ctx, pillX, pillY - pillH / 2, pillW, pillH, 999 * u);
    ctx.fillStyle = typePillBg(n.type);
    ctx.fill();
    ctx.fillStyle = typePillText(n.type);
    ctx.fillText(typeText, pillX + pillPadX, pillY + 0.5 * u);
    ctx.restore();

    // SCORE (top-right)
    const scoreText = `● ${score}`;
    ctx.save();
    ctx.font = `900 ${headerFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    const scoreW = ctx.measureText(scoreText).width;
    ctx.fillStyle = "rgba(100,116,139,0.95)";
    ctx.fillText(scoreText, left + W - 18 * u - scoreW, top + 18 * u + 0.5 * u);
    ctx.restore();

    // Title
    const titleX = left + 18 * u;
    const titleY = top + 56 * u;

    ctx.save();
    ctx.font = `900 ${titleFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    ctx.fillStyle = "rgba(15,23,42,0.95)";
    ctx.fillText(truncate(ctx, n.label, W - 36 * u), titleX, titleY);
    ctx.restore();

    // Bottom meta
    const indeg = n.in_degree ?? 0;
    const depth = n.depth_bfs == null ? "∞" : String(n.depth_bfs);
    const bottomLeft = `In ${indeg} • Depth ${depth}`;
    const bottomRight = riskLabel(n.risk);

    ctx.save();
    ctx.font = `800 ${smallFont}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    ctx.fillStyle = "rgba(100,116,139,0.95)";
    ctx.fillText(bottomLeft, left + 18 * u, top + H - 14 * u);

    const brW = ctx.measureText(bottomRight).width;
    const chipPad = 10 * u;
    const chipW = brW + chipPad * 2;
    const chipH = 20 * u;
    const chipX = left + W - 18 * u - chipW;
    const chipY = top + H - 16 * u;

    roundRect(ctx, chipX, chipY - chipH / 2, chipW, chipH, 999 * u);
    ctx.fillStyle = "rgba(241,245,249,1)";
    ctx.fill();
    ctx.strokeStyle = "rgba(226,232,240,1)";
    ctx.lineWidth = 1 * u;
    ctx.stroke();

    ctx.fillStyle = "rgba(15,23,42,0.85)";
    ctx.fillText(bottomRight, chipX + chipPad, chipY + 0.5 * u);
    ctx.restore();

    // Chevron (inside right)
    const cx = left + W - 26 * u;
    const cy = top + H / 2;

    ctx.save();
    ctx.strokeStyle = "rgba(148,163,184,0.95)";
    ctx.lineWidth = 2.2 * u;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(cx - 4 * u, cy - 5 * u);
    ctx.lineTo(cx + 3 * u, cy);
    ctx.lineTo(cx - 4 * u, cy + 5 * u);
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
    ctx.strokeStyle = LINK_STYLE.stroke ?? "rgba(148,163,184,0.55)";
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

// utils
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

function truncate(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
    if (!text) return "";
    if (ctx.measureText(text).width <= maxW) return text;
    let t = text;
    while (t.length > 6 && ctx.measureText(t + "…").width > maxW) {
        t = t.slice(0, -1);
    }
    return t + "…";
}
