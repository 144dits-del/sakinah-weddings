import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseDomain() {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname.toLowerCase();
    if (hostname.includes("sakinah.studio")) {
      return "sakinah.studio";
    }
    if (hostname.includes("sakinahweb.lovable.app")) {
      return "sakinahweb.lovable.app";
    }
    if (hostname.includes("sakinahweb.id")) {
      return "sakinahweb.id";
    }
    if (hostname !== "localhost" && !hostname.startsWith("127.0.0.1") && hostname.includes(".")) {
      const parts = hostname.split(".");
      if (parts.length >= 2) {
        if (parts[0] === "www" && parts.length > 2) {
          return parts.slice(1).join(".");
        }
        return parts.slice(-2).join(".");
      }
    }
  }
  return "sakinah.studio";
}

