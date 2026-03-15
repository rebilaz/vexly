export default function MiniLeadForm() {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      
      <h3 className="mb-4 text-xl font-semibold">
        Parle-moi de ton projet SaaS
      </h3>

      <form className="space-y-4">

        <div>
          <label className="text-xs uppercase text-neutral-500">
            Nom complet
          </label>
          <input
            type="text"
            placeholder="Jean Dupont"
            required
            className="w-full border-b border-neutral-300 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-neutral-500">
            Email
          </label>
          <input
            type="email"
            placeholder="email@entreprise.com"
            required
            className="w-full border-b border-neutral-300 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-neutral-500">
            Téléphone
          </label>
          <input
            type="tel"
            placeholder="+33 6 12 34 56 78"
            required
            className="w-full border-b border-neutral-300 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-neutral-500">
            Ton projet
          </label>
          <textarea
            placeholder="Explique rapidement ton idée de SaaS..."
            required
            rows={3}
            className="w-full resize-none border-b border-neutral-300 py-2 outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 text-sm text-white transition hover:opacity-90"
        >
          Discuter de mon projet
        </button>

      </form>

    </div>
  );
}