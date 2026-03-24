import type { ClassValue } from "./classname";
import { clsx } from "./classname";

type ClassNameProps = {
  className?: ClassValue;
};

const hasOwn = (value: object, key: PropertyKey): boolean =>
  Object.prototype.hasOwnProperty.call(value, key);

export function normalizeIntrinsicProps<T>(type: unknown, props: T): T {
  if (typeof type !== "string" || props == null || typeof props !== "object") {
    return props;
  }

  if (!hasOwn(props, "className")) {
    return props;
  }

  const className = (props as ClassNameProps).className;

  if (typeof className === "string") {
    return props;
  }

  return {
    ...(props as Record<string, unknown>),
    className: clsx(className),
  } as T;
}
