"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  title: string;
  items: FaqItem[];
}

export default function FaqSection({ title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <dl className="mt-4 space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 dark:border-dark-border"
          >
            <dt>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white"
              >
                <span>{item.question}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </dt>
            {openIndex === i && (
              <dd className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
                {item.answer}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
