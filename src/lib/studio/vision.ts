import type { StudioConfig } from "./config";

export type EventVision = {
  id: string;
  createdAt: string;
  config: StudioConfig;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    date?: string;
    location?: string;
    budget?: string;
    message?: string;
  };
  status?: string;
};

const KEY = "maison-orchestra:visions";

function read(): EventVision[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as EventVision[];
  } catch {
    return [];
  }
}

function write(list: EventVision[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function listVisions(): EventVision[] {
  return read();
}

export function getVision(id: string): EventVision | undefined {
  return read().find((v) => v.id.toLowerCase() === id.toLowerCase());
}

export function nextVisionId(): string {
  const year = new Date().getFullYear();
  const count = read().length + 1;
  return `EV-${year}-${String(count).padStart(4, "0")}`;
}

export function saveVision(
  config: StudioConfig,
  contact?: EventVision["contact"],
): EventVision {
  const list = read();
  const vision: EventVision = {
    id: nextVisionId(),
    createdAt: new Date().toISOString(),
    config,
    ...(contact ? { contact } : {}),
    status: "New",
  };
  write([vision, ...list]);
  return vision;
}

export function updateVision(id: string, patch: Partial<EventVision>) {
  const list = read().map((v) => (v.id === id ? { ...v, ...patch } : v));
  write(list);
}
