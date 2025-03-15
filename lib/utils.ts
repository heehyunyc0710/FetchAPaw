import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and merges Tailwind CSS classes using twMerge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 