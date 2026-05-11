import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export type { ClassArray, ClassDictionary, ClassValue } from "clsx";

export type ClassifyFn = (...inputs: ClassValue[]) => string;

type ConfigureOptions = {
  cx: ClassifyFn;
};

let activeConstructor: ClassifyFn = cxDefault;

export function configure({ cx }: ConfigureOptions): () => void {
  const previousConstructor = activeConstructor;
  activeConstructor = cx;

  return () => {
    activeConstructor = previousConstructor;
  };
}

export function cx(...inputs: ClassValue[]): string {
  return activeConstructor(...inputs);
}

export function cxDefault(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
