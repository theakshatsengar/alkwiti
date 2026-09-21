import { Plus } from "lucide-react";

export type StackPerson = {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
};

const ACCENTS = [
  "bg-sky-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
];

/** Deterministic, stable accent color per id. */
export function accentFor(id: string): string {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0;
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}

export function AvatarStack({
  people,
  max = 4,
  onAdd,
  className = "",
}: {
  people: StackPerson[];
  max?: number;
  onAdd?: () => void;
  className?: string;
}) {
  const shown = people.slice(0, max);

  return (
    <button
      type="button"
      onClick={onAdd}
      aria-label="Manage tracked people"
      className={`flex items-center ${className}`}
    >
      {shown.map((p) => (
        <span
          key={p.id}
          title={p.name}
          className={`-ml-4 grid size-10 place-items-center overflow-hidden rounded-full border-2 border-background text-[12px] font-semibold text-white first:ml-0 ${accentFor(
            p.id,
          )}`}
        >
          {p.avatarUrl ? (
            <img src={p.avatarUrl} alt={p.name} className="size-full object-cover" />
          ) : (
            p.initials
          )}
        </span>
      ))}
      <span className="-ml-4 grid size-10 place-items-center rounded-full border-2 border-background bg-white text-black transition-colors hover:bg-white/90">
        <Plus className="size-4" strokeWidth={2.5} />
      </span>
    </button>
  );
}
