import { Cpu } from "lucide-react";

export function TechStack({ stack }: { stack?: string[] }) {
  if (!stack || stack.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
        Tech Stack
      </h3>

      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <div
            key={tech}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-indigo-200"
          >
            <Cpu size={14} className="text-slate-400" />
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
