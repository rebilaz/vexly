import * as React from "react";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RainbowButton({
    children,
    className = "",
    ...props
}: RainbowButtonProps) {
    return (
        <button
            {...props}
            className={[
                "group relative inline-flex h-12 w-full items-center justify-between rounded-full px-7",
                "font-semibold text-white",
                "bg-[#6D5EF8] transition-colors duration-200 hover:bg-[#6456F3]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200",
                "disabled:pointer-events-none disabled:opacity-50",

                // RAINBOW BORDER (animated)
                "before:pointer-events-none before:absolute before:-inset-[2px] before:rounded-full",
                "before:bg-[conic-gradient(from_180deg,#6D5EF8,#22c55e,#06b6d4,#a855f7,#f97316,#6D5EF8)]",
                "before:opacity-0 before:transition-opacity before:duration-200",
                "before:animate-[spin_2.8s_linear_infinite]",
                "group-hover:before:opacity-100 group-focus-visible:before:opacity-100",

                // MASK: keep only border visible (center stays solid violet)
                "after:pointer-events-none after:absolute after:inset-0 after:rounded-full",
                "after:bg-[#6D5EF8]",
                "after:opacity-100",

                // LAYERING
                "isolate",

                className,
            ].join(" ")}
        >
            <span className="relative z-10 flex w-full items-center justify-between">
                {children}
            </span>
        </button>
    );
}
