import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = ComponentPropsWithoutRef<"div">;

/**
 * The centred page column: max-width and responsive gutters come from the
 * `--container-max` / `--gutter` tokens, so every page shares one grid.
 */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("container-page", className)} {...props} />;
}