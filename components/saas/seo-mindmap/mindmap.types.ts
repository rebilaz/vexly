// components/saas/seo-mindmap/mindmap.types.ts

export type MindMapType = "strategic" | "pillar" | "content" | "longtail";
export type Risk = "ok" | "warn" | "danger";

export type MindMapNode = {
    id: string;
    label: string;
    type: MindMapType;
    parent?: string | null;

    // diagnostic fields (from API)
    depth_bfs?: number | null;
    in_degree?: number;
    out_degree?: number;
    risk?: Risk;

    status_code?: number | null;
    render_mode?: "html" | "js_heavy" | "unknown" | null;
    response_ms?: number | null;
    bytes?: number | null;

    metaLeft?: string;
    metaRight?: string;

    // runtime (force-graph)
    x?: number;
    y?: number;
    fx?: number;
    fy?: number;

    // computed
    _depth?: number;
    _children?: string[];

    // runtime sizes for canvas hit-testing (chevron click)
    _w?: number;
    _h?: number;
};

export type MindMapLink = {
    source: string | MindMapNode;
    target: string | MindMapNode;
    weight?: number;

    // optional debug
    kind?: string;
    area?: string | null;
};

export type MindMapData = {
    nodes: MindMapNode[];
    links: MindMapLink[];
};

export type MindMapApi = {
    fit: () => void;
    zoomBy: (k: number) => void;
};
