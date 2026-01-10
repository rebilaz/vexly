type Props = {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onRecenter: () => void;
};

export default function MindMapControls({ onZoomIn, onZoomOut, onRecenter }: Props) {
    return (
        <div className="absolute right-6 bottom-6 z-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <button
                onClick={onZoomIn}
                className="block w-12 h-12 text-lg font-bold text-slate-700 hover:bg-slate-50"
                aria-label="Zoom in"
            >
                +
            </button>
            <div className="h-px bg-slate-200" />
            <button
                onClick={onZoomOut}
                className="block w-12 h-12 text-lg font-bold text-slate-700 hover:bg-slate-50"
                aria-label="Zoom out"
            >
                −
            </button>
            <div className="h-px bg-slate-200" />
            <button
                onClick={onRecenter}
                className="block w-12 h-12 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                aria-label="Recenter"
            >
                ⟲
            </button>
        </div>
    );
}
