export interface ClassDictionary {
  [className: string]: unknown;
}

export interface ClassArray extends ReadonlyArray<ClassValue> {}

export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;

export function clsx(value: ClassValue): string {
  const tokens: string[] = [];

  appendClassName(value, tokens);

  return tokens.join(" ");
}

function appendClassName(value: ClassValue, tokens: string[]): void {
  if (typeof value === "string") {
    if (value) {
      tokens.push(value);
    }

    return;
  }

  if (typeof value === "number") {
    tokens.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendClassName(item, tokens);
    }

    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [className, enabled] of Object.entries(value)) {
    if (enabled) {
      tokens.push(className);
    }
  }
}
