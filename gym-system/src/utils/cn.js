import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely.
 * Usage: className={cn("bg-red-500", props.className)}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}