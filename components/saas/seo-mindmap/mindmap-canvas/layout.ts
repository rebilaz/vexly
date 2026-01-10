// components/saas/seo-mindmap/mindmap-canvas/layout.ts
import type { MindMapData, MindMapNode } from "../mindmap.types";
import { LAYOUT } from "./theme";

const MAX_DEPTH_COL = 10; // 10+ bucket (∞ à droite)

function depthCol(n: MindMapNode) {
    const d = n.depth_bfs;
    if (typeof d !== "number" || !Number.isFinite(d)) return MAX_DEPTH_COL;
    return Math.min(d, MAX_DEPTH_COL);
}

// log scale for authority so it spreads well
function authorityY(n: MindMapNode) {
    const a = typeof n.in_degree === "number" ? n.in_degree : 0;
    // log1p spreads small values nicely
    const y = Math.log1p(Math.max(0, a));
    return y;
}

function stableHash(s: string) {
    // deterministic tiny hash for jitter
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

export function layoutColumns(data: MindMapData): MindMapData {
    const nodes = (data.nodes ?? []).map((n) => ({ ...n })) as MindMapNode[];
    const links = (data.links ?? []).map((l) => ({ ...l }));

    // Normalize ranges
    let maxAuth = 0;
    for (const n of nodes) {
        maxAuth = Math.max(maxAuth, authorityY(n));
    }
    if (!Number.isFinite(maxAuth) || maxAuth <= 0) maxAuth = 1;

    // Tunables
    const xGap = LAYOUT.colGap;     // 540
    const yGap = 220;              // vertical spread multiplier (bigger = more separation)
    const jitter = 22;             // small anti-overlap jitter

    for (const n of nodes) {
        const c = depthCol(n);
        const x = c * xGap;

        // normalized authority (0..1) then invert so high authority = up (negative)
        const a = authorityY(n) / maxAuth; // 0..1
        const baseY = -a * yGap * 6;       // 6 bands worth of height

        // deterministic jitter so nodes don't overlap perfectly
        const h = stableHash(n.id);
        const jx = ((h % 1000) / 1000 - 0.5) * jitter;
        const jy = (((Math.floor(h / 1000) % 1000) / 1000) - 0.5) * jitter;

        n.fx = x + jx;
        n.fy = baseY + jy;
    }

    return { nodes, links };
}
