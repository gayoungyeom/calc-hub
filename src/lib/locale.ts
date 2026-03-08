export type Locale = "ko" | "en";

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/kr")) return "ko";
  if (pathname.startsWith("/us")) return "en";
  return "en"; // default for root and other pages
}
