import Link from "next/link";

export function PricingSocialProof() {
  return (
    <section className="mx-auto mt-14 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        Ils ont lancé leur SaaS avec Vexly
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-white/55">
        {["GemScale", "SwiftR", "NovaBlocks", "Connectify"].map((name) => (
          <div key={name} className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-white/35" />
            {name}
          </div>
        ))}
      </div>

      <div className="mt-2" />
    </section>
  );
}
