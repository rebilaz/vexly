import React, { CSSProperties } from "react";

export interface ShimmerButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "2px",
            shimmerDuration = "2.8s",
            borderRadius = "9999px",
            background = "#6D5EF8",
            className = "",
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                {...props}
                style={
                    {
                        "--spread": "90deg",
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                    } as CSSProperties
                }
                className={[
                    // base
                    "group relative isolate z-0 flex w-full items-center justify-between overflow-hidden",
                    "h-12 px-7 rounded-full font-semibold text-white",
                    "bg-[var(--bg)] transition-colors duration-200",
                    "hover:brightness-[1.05]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200",
                    "disabled:pointer-events-none disabled:opacity-50",

                    // allow overrides
                    className,
                ].join(" ")}
            >
                {/* ===== SHIMMER BORDER ===== */}
                <div className="pointer-events-none absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
                    <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1]">
                        <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
                    </div>
                </div>

                {/* ===== CONTENT ===== */}
                <span className="relative z-10 flex w-full items-center justify-between">
                    {children}
                </span>

                {/* ===== INNER HIGHLIGHT ===== */}
                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />

                {/* ===== BACKDROP (CUT BORDER) ===== */}
                <div className="pointer-events-none absolute -z-20 [inset:var(--cut)] rounded-full bg-[var(--bg)]" />
            </button>
        );
    }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
