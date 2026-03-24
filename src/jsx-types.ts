import type * as React from "react";
import type { ClassValue } from "./classname";

type WidenClassName<T> = T extends { className?: infer ExistingClassName }
  ? Omit<T, "className"> & {
      className?: ExistingClassName | ClassValue;
    }
  : T & {
      className?: ClassValue;
    };

export type WidenedIntrinsicElements = {
  [K in keyof React.JSX.IntrinsicElements]: WidenClassName<React.JSX.IntrinsicElements[K]>;
};
