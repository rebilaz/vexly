import NextImage from "next/image";

type Props = {
  image?: string;
  name: string;
  /**
   * À activer UNIQUEMENT pour les images réellement above-the-fold
   * (homepage, featured listing, hero critique)
   */
  priority?: boolean;
};

export function Image({ image, name, priority = false }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/40 transition-all duration-500 hover:shadow-slate-200/60">
      <div className="relative aspect-[16/10] w-full bg-slate-100">
        {image && image.startsWith("http") ? (
          <NextImage
            src={image}
            alt={`Interface du SaaS ${name}`}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1000px"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-50 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 opacity-40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="text-sm font-medium opacity-60">
              Aperçu indisponible
            </span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
    </div>
  );
}
