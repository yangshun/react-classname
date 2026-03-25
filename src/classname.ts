import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export type { ClassArray, ClassDictionary, ClassValue } from "clsx";

export type ClassifyFn = (value: ClassValue) => string;

type ConfigureOptions = {
  fn: ClassifyFn;
};

let activeConstructor: ClassifyFn = defaultClassify;

export function configure({ fn }: ConfigureOptions): () => void {
  const previousConstructor = activeConstructor;
  activeConstructor = fn;

  return () => {
    activeConstructor = previousConstructor;
  };
}

export function classify(value: ClassValue): string {
  return activeConstructor(value);
}

export function defaultClassify(value: ClassValue): string {
  return clsx(value);
}
