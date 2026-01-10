"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { ForceGraphMethods } from "react-force-graph-2d";
import type { MindMapApi, MindMapData, MindMapLink, MindMapNode } from "./mindmap.types";
import { CANVAS_STYLE, createDottedBg, layoutColumns, drawLink, drawNode } from "./mindmap-canvas";

const ForceGraph2D = dynamic(
    () => import("react-force-graph-2d").then((m) => m.default as any),
    { ssr: false }
) as any;

type Props = {
    data: MindMapData;
    onOpen: (n: MindMapNode | null) => void;
    onToggle: (n: MindMapNode) => void;
    apiRef: React.MutableRefObject<MindMapApi | null>;
};

function asId(v: any) {
    return typeof v === "string" ? v : v?.id;
}

function resolveLinks(graph: MindMapData): MindMapData {
    const nodes = graph.nodes ?? [];
    const links = graph.links ?? [];

    const map = new Map<string, MindMapNode>();
    for (const n of nodes) map.set(n.id, n);

    const resolved: MindMapLink[] = [];
    for (const l of links as MindMapLink[]) {
        // keep only drawables
        if (l.kind && l.kind === "canonical") continue;

        const sid = asId(l.source);
        const tid = asId(l.target);
        if (!sid || !tid) continue;
        if (sid === tid) continue;

        const sNode = map.get(sid);
        const tNode = map.get(tid);
        if (!sNode || !tNode) continue;

        resolved.push({ ...l, source: sNode, target: tNode });
    }

    return { nodes, links: resolved };
}

export default function MindMapCanvas({ data, onOpen, onToggle, apiRef }: Props) {
    const graphRef = React.useRef<ForceGraphMethods | null>(null);

    // ✅ SSR-safe dotted background (createDottedBg returns null on server)
    const bg = React.useMemo(() => createDottedBg(), []);
    const bgUrl = React.useMemo(() => (bg ? `url(${bg.toDataURL()})` : "none"), [bg]);

    const laidOut = React.useMemo(() => layoutColumns(data), [data]);
    const graphData = React.useMemo(() => resolveLinks(laidOut), [laidOut]);

    React.useEffect(() => {
        apiRef.current = {
            fit: () => graphRef.current?.zoomToFit?.(700, 120),
            zoomBy: (k: number) => {
                const fg = graphRef.current;
                if (!fg) return;
                const current = fg.zoom();
                fg.zoom(current * k, 250);
            },
        };

        const t = setTimeout(() => graphRef.current?.zoomToFit?.(700, 120), 80);
        return () => clearTimeout(t);
    }, [apiRef, graphData]);

    return (
        <div
            className="absolute inset-0"
            style={{
                backgroundColor: CANVAS_STYLE.bgColor,
                backgroundImage: bgUrl,
            }}
        >
            <ForceGraph2D
                ref={graphRef as any}
                graphData={graphData as any}
                backgroundColor="rgba(0,0,0,0)"
                nodeId="id"
                enableNodeDrag={false}
                cooldownTicks={0}
                linkColor={() => "rgba(0,0,0,0)"}
                linkWidth={() => 0}
                linkCanvasObjectMode={() => "replace"}
                linkCanvasObject={drawLink as any}
                nodeCanvasObject={drawNode as any}
                nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
                    const n = node as MindMapNode;
                    const x = n.x ?? n.fx ?? 0;
                    const y = n.y ?? n.fy ?? 0;

                    const w = n._w ?? 260;
                    const h = n._h ?? 100;
                    const extraRight = 140;

                    ctx.fillStyle = color;
                    ctx.fillRect(x - w / 2, y - h / 2, w + extraRight, h);
                }}
                onNodeClick={(node: any, evt: MouseEvent) => {
                    const n = node as MindMapNode;
                    const fg: any = graphRef.current;

                    const w = n._w ?? 0;
                    const h = n._h ?? 0;
                    if (!w || !h) return onOpen(n);

                    const gx = (n.x ?? n.fx ?? 0) as number;
                    const gy = (n.y ?? n.fy ?? 0) as number;

                    const center = fg?.graph2ScreenCoords?.(gx, gy);
                    if (!center) return onOpen(n);

                    const zoom = fg?.zoom?.() ?? 1;
                    const halfW = (w * zoom) / 2;

                    // render.ts offset: 18*u where u=1/max(zoom,1) => screen offset = 18*min(zoom,1)
                    const off = 18 * Math.min(zoom, 1);
                    const chevronCx = center.x + halfW + off;
                    const chevronCy = center.y;

                    // coords in canvas space
                    let px = (evt as any).offsetX as number | undefined;
                    let py = (evt as any).offsetY as number | undefined;

                    if (typeof px !== "number" || typeof py !== "number") {
                        const canvas: HTMLCanvasElement | undefined = fg?.canvas?.();
                        const r = canvas?.getBoundingClientRect();
                        if (r) {
                            px = evt.clientX - r.left;
                            py = evt.clientY - r.top;
                        } else {
                            px = evt.clientX;
                            py = evt.clientY;
                        }
                    }

                    const dx = px - chevronCx;
                    const dy = py - chevronCy;

                    const R = 28;
                    const isChevron = dx * dx + dy * dy <= R * R;

                    if (isChevron && (n.type === "pillar" || n.type === "content")) {
                        onToggle(n);
                        return;
                    }

                    onOpen(n);
                }}
                onBackgroundClick={() => onOpen(null)}
            />
        </div>
    );
}
