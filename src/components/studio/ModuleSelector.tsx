import type { CatalogItem } from "@/lib/studio/catalog";
import { formatINR } from "@/lib/studio/catalog";

export function ModuleSelector({
  title,
  items,
  selectedId,
  onSelect,
}: {
  title: string;
  items: CatalogItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section aria-label={title}>
      <h3 className="eyebrow mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const active = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-pressed={active}
              className={[
                "group flex flex-col items-start gap-1 border p-3 text-left transition-all duration-300",
                active
                  ? "border-champagne bg-champagne/10"
                  : "border-border hover:border-champagne/50 hover:bg-accent/40",
              ].join(" ")}
            >
              <span className="text-xs leading-snug text-foreground">{item.name}</span>
              <span className="text-[0.65rem] tracking-wider text-muted-foreground">
                {formatINR(item.price)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function DecorToggles({
  items,
  selectedIds,
  onToggle,
}: {
  items: CatalogItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <section aria-label="Decor elements">
      <h3 className="eyebrow mb-4">Decor</h3>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = selectedIds.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                aria-pressed={active}
                className="flex w-full items-center justify-between border-b border-border/60 py-2.5 text-left transition-colors hover:text-champagne"
              >
                <span className="text-xs">{item.name}</span>
                <span
                  className={[
                    "relative h-4 w-8 shrink-0 border transition-colors",
                    active ? "border-champagne bg-champagne/30" : "border-border",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute top-1/2 size-2.5 -translate-y-1/2 transition-all",
                      active
                        ? "left-[calc(100%-0.8rem)] bg-champagne"
                        : "left-0.5 bg-muted-foreground",
                    ].join(" ")}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
