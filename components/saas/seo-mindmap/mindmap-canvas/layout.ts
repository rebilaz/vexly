// components/saas/seo-mindmap/mindmap-canvas/layout.ts
import type { MindMapData, MindMapNode } from "../mindmap.types";
import { LAYOUT } from "./theme";

const MAX_DEPTH_COL = 10;
const ORPHANS_COL = -1; // ✅ colonne spéciale à gauche

function isOrphan(n: MindMapNode): boolean {
    const indeg = typeof n.in_degree === "number" ? n.in_degree : 0;
    return n.depth_bfs == null || indeg <= 0;
}

function depthView(n: MindMapNode): number {
    if (isOrphan(n)) return ORPHANS_COL; // ✅ bucket visuel
    const d = n.depth_bfs;
    if (typeof d !== "number" || !Number.isFinite(d)) return MAX_DEPTH_COL;
    return Math.min(d, MAX_DEPTH_COL);
}

function authorityScore(n: MindMapNode): number {
    const a = typeof n.in_degree === "number" ? n.in_degree : 0;
    return Math.log1p(Math.max(0, a));
}

function normalize(s: string): string {
    return (s ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
}

function buildIndex(nodes: MindMapNode[]): Map<string, MindMapNode> {
    const map = new Map<string, MindMapNode>();
    for (const n of nodes) map.set(n.id, n);
    return map;
}

type GroupKey = "PAGES" | "ARTICLES" | "ANNUAIRE" | "TAGS";
const GROUP_ORDER: GroupKey[] = ["PAGES", "ARTICLES", "ANNUAIRE", "TAGS"];

const GROUP_META: Record<GroupKey, { label: string; color: string }> = {
    PAGES: { label: "Pages", color: "rgba(15,23,42,0.95)" },
    ARTICLES: { label: "Articles", color: "rgba(37,99,235,0.95)" },
    ANNUAIRE: { label: "Annuaire", color: "rgba(22,163,74,0.95)" },
    TAGS: { label: "Tags", color: "rgba(245,158,11,0.95)" },
};

function groupFromParentChain(n: MindMapNode, index: Map<string, MindMapNode>): GroupKey {
    let cur: MindMapNode | undefined = n;

    for (let i = 0; i < 14; i++) {
        const label = normalize(cur?.label ?? "");
        const id = normalize(cur?.id ?? "");

        if (
            label.includes("tag") ||
            label.includes("categorie") ||
            label.includes("category") ||
            id.includes("tag") ||
            id.includes("categorie") ||
            id.includes("category")
        ) return "TAGS";

        if (
            label.includes("marketplace") ||
            label.includes("annuaire") ||
            id.includes("marketplace") ||
            id.includes("annuaire")
        ) return "ANNUAIRE";

        if (label.includes("article") || label.includes("blog") || id.includes("article") || id.includes("blog"))
            return "ARTICLES";

        const parentId: string | null | undefined = cur?.parent ?? null;
        const p: MindMapNode | undefined = parentId ? index.get(parentId) : undefined;
        if (!p) break;
        cur = p;
    }

    return "PAGES";
}

function groupFromUrlFallback(n: MindMapNode): GroupKey {
    const p = normalize(String((n as any).path ?? (n as any).url ?? ""));
    if (p.includes("/tags/") || p.includes("/tag/") || p.includes("/categorie") || p.includes("/category")) return "TAGS";
    if (p.includes("/marketplace/") || p.includes("/annuaire/")) return "ANNUAIRE";
    if (p.includes("/blog/") || p.includes("/articles/") || p.includes("/saas/")) return "ARTICLES";
    return "PAGES";
}

function getGroup(n: MindMapNode, index: Map<string, MindMapNode>): GroupKey {
    const g1 = groupFromParentChain(n, index);
    return g1 === "PAGES" ? groupFromUrlFallback(n) : g1;
}

export function layoutColumns(data: MindMapData): MindMapData {
    const nodes = (data.nodes ?? []).map((n) => ({ ...n })) as MindMapNode[];
    const links = (data.links ?? []).map((l) => ({ ...l }));

    const index = buildIndex(nodes);

    const xGap = LAYOUT.colGap;
    const rowGap = LAYOUT.rowGap ?? 118;
    const groupGap = LAYOUT.groupGap ?? 34;

    const startX = 0;
    const startY = -90;

    // group by depth_view (orphelins => -1)
    const byDepth = new Map<number, MindMapNode[]>();
    for (const n of nodes) {
        const d = depthView(n);
        n._depth = d;            // depth visuel
        n._isOrphan = isOrphan(n);
        if (!byDepth.has(d)) byDepth.set(d, []);
        byDepth.get(d)!.push(n);
    }

    const sortByAuth = (a: MindMapNode, b: MindMapNode) => {
        const aa = authorityScore(a);
        const bb = authorityScore(b);
        if (bb !== aa) return bb - aa;
        return a.id.localeCompare(b.id);
    };

    for (const [depth, arr] of byDepth) {
        const x = startX + depth * xGap; // depth=-1 => colonne à gauche

        const groups = new Map<GroupKey, MindMapNode[]>();
        for (const n of arr) {
            const g = getGroup(n, index);
            n._groupKey = g;
            n._groupLabel = depth === ORPHANS_COL ? "Orphans" : GROUP_META[g].label; // ✅ label différent
            n._groupColor = depth === ORPHANS_COL ? "rgba(239,68,68,0.95)" : GROUP_META[g].color; // rouge

            if (!groups.has(g)) groups.set(g, []);
            groups.get(g)!.push(n);
        }

        let y = startY;

        for (const g of GROUP_ORDER) {
            const list = groups.get(g);
            if (!list || list.length === 0) continue;

            list.sort(sortByAuth);

            // petit header pad
            y += 10;

            for (const n of list) {
                n.fx = x;
                n.fy = y;
                y += rowGap;
            }

            y += groupGap;
        }
    }

    return { nodes, links };
}
