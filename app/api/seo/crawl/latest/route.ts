// app/api/seo/crawl/latest/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function sb() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
        );
    }
    return createClient(url, key, { auth: { persistSession: false } });
}

function labelFromUrl(u: string) {
    try {
        const url = new URL(u);
        if (url.pathname === "/") return "Accueil";
        const last = url.pathname.split("/").filter(Boolean).pop() || url.pathname;
        return last.replaceAll("-", " ").slice(0, 46);
    } catch {
        return u.slice(0, 46);
    }
}

// minimal normalizer (server)
function norm(u: string) {
    try {
        const url = new URL(u);
        url.hash = "";
        if (url.pathname !== "/" && url.pathname.endsWith("/")) {
            url.pathname = url.pathname.slice(0, -1);
        }
        return url.toString();
    } catch {
        return u;
    }
}

function safePath(u: string | null | undefined): string | null {
    if (!u) return null;
    try {
        return new URL(u).pathname || "/";
    } catch {
        // if someone stored a path directly
        if (u.startsWith("/")) return u;
        return null;
    }
}

function pickHomeId(baseUrl: string, nodeSet: Set<string>) {
    try {
        const u = new URL(baseUrl);
        u.hash = "";
        u.search = "";
        u.pathname = "/";
        const home = norm(u.toString());
        if (nodeSet.has(home)) return home;
    } catch { }

    for (const id of nodeSet) {
        try {
            const u = new URL(id);
            if (u.pathname === "/") return id;
        } catch { }
    }
    return null;
}

type Risk = "ok" | "warn" | "danger";

// risk heuristic (simple & actionnable)
function computeRisk(p: {
    depth_bfs: number | null;
    in_degree: number;
    render_mode?: string | null;
    status_code?: number | null;
    response_ms?: number | null;
    bytes?: number | null;
}): Risk {
    const d = p.depth_bfs;
    const indeg = p.in_degree ?? 0;
    const js = p.render_mode === "js_heavy";
    const st = p.status_code ?? 200;
    const ms = p.response_ms ?? 0;
    const bytes = p.bytes ?? 0;

    // danger
    if (st >= 400) return "danger";
    if (indeg === 0) return "danger";
    if (js && typeof d === "number" && d >= 3) return "danger";
    if (typeof d === "number" && d >= 5 && indeg <= 1) return "danger";

    // warn
    if (typeof d === "number" && d >= 3 && indeg <= 1) return "warn";
    if (js) return "warn";
    if (ms > 1500) return "warn";
    if (bytes > 800_000) return "warn";

    return "ok";
}

function bfs(homeId: string, adj: Map<string, string[]>) {
    const depth = new Map<string, number>();
    const parent = new Map<string, string | null>();
    const q: string[] = [homeId];

    depth.set(homeId, 0);
    parent.set(homeId, null);

    while (q.length) {
        const cur = q.shift()!;
        const d = depth.get(cur)!;
        const nexts = adj.get(cur) ?? [];
        for (const nx of nexts) {
            if (depth.has(nx)) continue;
            depth.set(nx, d + 1);
            parent.set(nx, cur);
            q.push(nx);
        }
    }

    return { depth, parent };
}

type PageRow = {
    url: string;
    depth: number | null;
    title: string | null;
    status_code: number | null;
    is_indexable: boolean | null;
    nofollow: boolean | null;
    content_type: string | null;
    render_mode: string | null;
    flags: any;
    response_ms: number | null;
    bytes: number | null;
    canonical_url: string | null;
    final_url: string | null;
};

function bestOpenUrl(p?: PageRow | null, fallback?: string) {
    const u = p?.canonical_url || p?.final_url || p?.url || fallback || "";
    return u ? norm(u) : null;
}

export async function GET() {
    try {
        const sbClient = sb();

        // latest run
        const latestRunRes = await sbClient
            .from("crawl_runs")
            .select("id,status,base_url,started_at,finished_at")
            .in("status", ["done", "running"])
            .order("started_at", { ascending: false })
            .limit(1)
            .maybeSingle();

        if (latestRunRes.error) throw new Error(latestRunRes.error.message);

        const run = latestRunRes.data;
        if (!run?.id) {
            return NextResponse.json(
                { ok: false, error: "No crawl_runs found" },
                { status: 404 }
            );
        }

        const run_id = run.id as string;

        // pages
        const pagesRes = await sbClient
            .from("crawl_pages")
            .select(
                "url,depth,title,status_code,is_indexable,nofollow,content_type,render_mode,flags,response_ms,bytes,canonical_url,final_url"
            )
            .eq("run_id", run_id)
            .order("depth", { ascending: true })
            .limit(5000);

        if (pagesRes.error) throw new Error(pagesRes.error.message);

        const pages = (pagesRes.data ?? []) as PageRow[];
        if (!pages.length) {
            return NextResponse.json(
                { ok: false, error: "Latest run has no pages" },
                { status: 404 }
            );
        }

        // url -> page lookup (by requested url)
        const pageByUrl = new Map<string, PageRow>();
        for (const p of pages) pageByUrl.set(norm(p.url), p);

        // canonical key (used as node.id)
        const keyOf = (u: string) => {
            const p = pageByUrl.get(norm(u));
            const base = p?.canonical_url ? norm(p.canonical_url) : norm(u);
            return base;
        };

        // nodes (dedupe by canonical)
        const nodeMap = new Map<string, any>();

        for (const p of pages) {
            const key = keyOf(p.url);

            const openUrl = bestOpenUrl(p, key); // ✅ URL à ouvrir
            const path = openUrl ? safePath(openUrl) : safePath(key);

            const mode =
                p.render_mode === "js_heavy"
                    ? "JS"
                    : p.render_mode === "html"
                        ? "HTML"
                        : "UNK";

            const existing = nodeMap.get(key);

            if (!existing) {
                nodeMap.set(key, {
                    // ✅ ForceGraph ID
                    id: key,

                    // ✅ Required for side panel actions
                    url: openUrl ?? key,
                    path: path ?? undefined,

                    // Useful debug
                    source_url: norm(p.url),
                    final_url: p.final_url ? norm(p.final_url) : null,
                    canonical_url: p.canonical_url ? norm(p.canonical_url) : null,

                    label: p.title?.trim() || labelFromUrl(openUrl ?? key),

                    // filled later
                    depth_bfs: null as number | null,
                    parent: null as string | null,

                    in_degree: 0,
                    out_degree: 0,
                    risk: "ok" as Risk,

                    // keep some metrics for panel
                    status_code: p.status_code ?? null,
                    render_mode: p.render_mode ?? null,
                    response_ms: p.response_ms ?? null,
                    bytes: p.bytes ?? null,

                    metaLeft: `${mode} • ${p.status_code ?? "—"}`,
                    metaRight: `Depth: —`,
                    type: "longtail",
                });
            } else {
                // merge: keep best label
                if (
                    (!existing.label || existing.label === labelFromUrl(existing.url ?? key)) &&
                    p.title?.trim()
                ) {
                    existing.label = p.title.trim();
                }

                // ✅ keep a valid open url if missing
                if (!existing.url && openUrl) existing.url = openUrl;
                if (!existing.path && path) existing.path = path;

                // keep worst status (for risk)
                const prev = existing.status_code ?? 200;
                const cur = p.status_code ?? 200;
                existing.status_code = Math.max(prev, cur);

                // keep JS if any
                if (existing.render_mode !== "js_heavy" && p.render_mode === "js_heavy") {
                    existing.render_mode = "js_heavy";
                    existing.metaLeft = `JS • ${existing.status_code ?? "—"}`;
                }

                // keep max bytes/ms
                existing.response_ms =
                    Math.max(existing.response_ms ?? 0, p.response_ms ?? 0) || null;
                existing.bytes = Math.max(existing.bytes ?? 0, p.bytes ?? 0) || null;

                // keep debug urls
                if (!existing.canonical_url && p.canonical_url) existing.canonical_url = norm(p.canonical_url);
                if (!existing.final_url && p.final_url) existing.final_url = norm(p.final_url);
            }
        }

        const nodes = [...nodeMap.values()];
        const nodeSet = new Set(nodes.map((n: any) => n.id));

        // links (with area)
        const linksRes = await sbClient
            .from("crawl_links")
            .select("from_url,to_url,kind,area")
            .eq("run_id", run_id)
            .in("kind", ["a", "canonical", "redirect"])
            .limit(80000);

        if (linksRes.error) throw new Error(linksRes.error.message);

        const allEdges = linksRes.data ?? [];

        // --- weights (Google-like) ---
        const AREA_W: Record<string, number> = {
            content: 3.0,
            header: 0.6,
            nav: 0.5,
            footer: 0.2,
            other: 0.3,
        };

        // graphs
        const adjContent = new Map<string, string[]>();
        const adjReach = new Map<string, string[]>();
        for (const id of nodeSet) {
            adjContent.set(id, []);
            adjReach.set(id, []);
        }

        // degrees
        const inDegWeighted = new Map<string, number>();
        const outDegWeighted = new Map<string, number>();

        const inDegContent = new Map<string, number>();
        const outDegContent = new Map<string, number>();

        for (const e of allEdges as any[]) {
            if (e.kind !== "a") continue;

            const from = keyOf(e.from_url);
            const to = keyOf(e.to_url);
            if (!nodeSet.has(from) || !nodeSet.has(to)) continue;
            if (from === to) continue;

            const area = (e.area ?? "other") as string;
            const w = AREA_W[area] ?? 0.3;

            outDegWeighted.set(from, (outDegWeighted.get(from) ?? 0) + w);
            inDegWeighted.set(to, (inDegWeighted.get(to) ?? 0) + w);

            if (area === "content") {
                adjContent.get(from)!.push(to);
                outDegContent.set(from, (outDegContent.get(from) ?? 0) + 1);
                inDegContent.set(to, (inDegContent.get(to) ?? 0) + 1);
            }

            if (area === "content" || area === "header" || area === "nav") {
                adjReach.get(from)!.push(to);
            }
        }

        // BFS from home
        let depth = new Map<string, number>();
        let parent = new Map<string, string | null>();

        const homeId = pickHomeId(run.base_url ?? "", nodeSet);
        if (homeId) {
            const r1 = bfs(homeId, adjContent);
            depth = r1.depth;
            parent = r1.parent;

            const ratio = depth.size / nodeSet.size;
            if (ratio < 0.25) {
                const r2 = bfs(homeId, adjReach);
                depth = r2.depth;
                parent = r2.parent;
            }
        }

        // Apply metrics to nodes
        for (const n of nodes as any[]) {
            const d = depth.get(n.id);
            const p = parent.get(n.id);

            n.depth_bfs = typeof d === "number" ? d : null;
            n.parent = typeof p === "string" ? p : null;

            // ✅ Authority for Y (weighted)
            n.in_degree = Math.round((inDegWeighted.get(n.id) ?? 0) * 10) / 10;
            n.out_degree = Math.round((outDegWeighted.get(n.id) ?? 0) * 10) / 10;

            // optional debug
            n.in_degree_content = inDegContent.get(n.id) ?? 0;
            n.out_degree_content = outDegContent.get(n.id) ?? 0;

            n.risk = computeRisk(n);

            // type
            if (n.depth_bfs === 0) n.type = "strategic";
            else if (n.depth_bfs === 1) n.type = "pillar";
            else if (n.depth_bfs === 2) n.type = "content";
            else n.type = "longtail";

            n.metaRight = `Depth: ${n.depth_bfs == null ? "∞" : n.depth_bfs}`;

            // ✅ ensure url/path never missing
            if (!n.url) n.url = n.id;
            if (!n.path) n.path = safePath(n.url) ?? safePath(n.id) ?? undefined;
        }

        // ✅ tree links only = parent -> child
        const treeLinks: any[] = [];
        for (const n of nodes as any[]) {
            if (n.parent && nodeSet.has(n.parent) && nodeSet.has(n.id)) {
                treeLinks.push({ source: n.parent, target: n.id, weight: 1.0, kind: "tree" });
            }
        }

        // extra links (optional debug) - dedup
        const edgeSet = new Set<string>();
        const extraLinks: any[] = [];

        for (const e of allEdges as any[]) {
            const from = keyOf(e.from_url);
            const to = keyOf(e.to_url);
            if (!nodeSet.has(from) || !nodeSet.has(to)) continue;
            if (from === to) continue;

            // drop edges that are already in the tree (for content edges)
            if (e.kind === "a" && e.area === "content") {
                const toNode = nodeMap.get(to);
                if (toNode?.parent === from) continue;
            }

            const k = `${from}::${to}::${e.kind}::${e.area ?? ""}`;
            if (edgeSet.has(k)) continue;
            edgeSet.add(k);

            extraLinks.push({
                source: from,
                target: to,
                weight: e.kind === "redirect" ? 2.2 : e.kind === "canonical" ? 1.6 : 0.7,
                kind: e.kind,
                area: e.area ?? null,
            });
        }

        // Summary KPIs
        const depths = nodes
            .map((n: any) => (typeof n.depth_bfs === "number" ? n.depth_bfs : null))
            .filter((x: any) => x != null) as number[];
        const avgDepth = depths.length
            ? depths.reduce((a, b) => a + b, 0) / depths.length
            : 0;

        const jsCount = nodes.filter((n: any) => n.render_mode === "js_heavy").length;
        const orphanCount = nodes.filter((n: any) => (n.in_degree ?? 0) === 0).length;
        const deepWeak = nodes.filter(
            (n: any) =>
                typeof n.depth_bfs === "number" &&
                n.depth_bfs >= 4 &&
                (n.in_degree ?? 0) <= 1
        ).length;

        return NextResponse.json({
            ok: true,
            run: {
                id: run_id,
                status: run.status,
                base_url: run.base_url,
                started_at: run.started_at,
                finished_at: run.finished_at,
            },
            summary: {
                avg_depth: Number(avgDepth.toFixed(2)),
                js_count: jsCount,
                orphan_count: orphanCount,
                deep_weak_count: deepWeak,
            },
            nodes,
            treeLinks,
            extraLinks,
        });
    } catch (e: any) {
        return NextResponse.json(
            { ok: false, error: String(e?.message ?? e) },
            { status: 500 }
        );
    }
}
