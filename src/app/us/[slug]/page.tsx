import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import UsCalculator from "@/components/us/UsCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import usPages from "@/config/longtail/us-pages.json";

interface PageData {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  defaultState?: string;
}

export function generateStaticParams() {
  return usPages.map((page: PageData) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = usPages.find((p: PageData) => p.slug === slug);
    if (!page) return {};
    return {
      title: `${page.title} — CalcHub`,
      description: page.description,
      keywords: page.keywords,
    };
  });
}

export default async function UsLongtailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = usPages.find((p: PageData) => p.slug === slug);
  if (!page) notFound();

  const otherPages = usPages
    .filter((p: PageData) => p.slug !== slug)
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {page.h1}
        </h1>
        <p className="mt-2 text-gray-600">{page.description}</p>
        <p className="mt-1 text-sm text-gray-400">2026 Tax Year</p>
      </div>

      <UsCalculator />

      {/* Related calculators */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900">
          Related Tax Calculators
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink
              href="/us/1099-tax-calculator"
              label="1099 Self-Employed Tax Calculator"
              from={slug}
            />
          </li>
          {otherPages.map((p: PageData) => (
            <li key={p.slug}>
              <RelatedLink
                href={`/us/${p.slug}`}
                label={p.h1}
                from={slug}
              />
            </li>
          ))}
        </ul>
      </section>

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
        locale="en"
        sources={[
          {
            label: "IRS Publication 334 — Tax Guide for Small Business",
            url: "https://www.irs.gov/publications/p334",
          },
          {
            label: "IRS Schedule SE — Self-Employment Tax",
            url: "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040",
          },
        ]}
        calculationMethod="Gross Income → Business Expenses → Net Business Income → SE Tax (92.35% × 15.3%) → AGI → Deduction → Federal Tax → State Tax"
      />
    </main>
  );
}
