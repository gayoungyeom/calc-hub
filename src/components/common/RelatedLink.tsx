"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/gtag";

interface Props {
  href: string;
  label: string;
  from: string;
}

export default function RelatedLink({ href, label, from }: Props) {
  return (
    <Link
      href={href}
      className="text-sm text-blue-600 hover:underline dark:text-dark-blue"
      onClick={() =>
        trackEvent({
          action: "click_related_calculator",
          category: "navigation",
          label: `${from} → ${href}`,
        })
      }
    >
      {label}
    </Link>
  );
}
