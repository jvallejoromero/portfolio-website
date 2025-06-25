import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomId(len = 6) {
  return Math.random().toString(36).slice(2, 2+len).toUpperCase();
}
