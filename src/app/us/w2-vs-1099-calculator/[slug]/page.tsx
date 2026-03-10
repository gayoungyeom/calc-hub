import type { Metadata } from "next";
import { notFound } from "next/navigation";
import W2vs1099Calculator from "@/components/us/w2-vs-1099/W2vs1099Calculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import pages from "@/config/longtail/us-w2-vs-1099-pages.json";

interface FaqItem { question: string; answer: string; }
interface PageData { slug: string; title: string; h1: string; description: string; keywords: string[]; faq?: FaqItem[]; }

export function generateStaticParams() {
  return pages.map((page: PageData) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = pages.find((p: PageData) => p.slug === slug);
    if (!page) return {};
    return {
      title: `${page.title} — CalcHub`,
      description: page.description,
      keywords: page.keywords,
      alternates: { languages: { en: `/us/w2-vs-1099-calculator/${slug}`, ko: "/kr", "x-default": "/" } },
    };
  });
}

export default async function W2vs1099LongtailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages.find((p: PageData) => p.slug === slug);
  if (!page) notFound();

  const otherPages = pages.filter((p: PageData) => p.slug !== slug).slice(0, 4);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{page.h1}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{page.description}</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026 Tax Year</p>
      </div>

      <W2vs1099Calculator />

      {page.faq && page.faq.length > 0 && (
        <>
          <FaqSection title="Frequently Asked Questions" items={page.faq} />
          <FaqSchema items={page.faq} />
        </>
      )}

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Related Tax Calculators</h2>
        <ul className="mt-4 space-y-2">
          <li><RelatedLink href="/us/w2-vs-1099-calculator" label="W-2 vs 1099 Calculator" from={slug} /></li>
          <li><RelatedLink href="/us/1099-tax-calculator" label="1099 Self-Employed Tax Calculator" from={slug} /></li>
          {otherPages.map((p: PageData) => (
            <li key={p.slug}><RelatedLink href={`/us/w2-vs-1099-calculator/${p.slug}`} label={p.h1} from={slug} /></li>
          ))}
        </ul>
      </section>

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-03-08"
        locale="en"
        sources={[
          { label: "IRS — Employee vs Independent Contractor", url: "https://www.irs.gov" },
          { label: "IRS Schedule SE", url: "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040" },
        ]}
        calculationMethod="W-2: FICA (7.65%) + Federal Tax + State Tax | 1099: SE Tax (15.3%) + Federal Tax + State Tax - Business Deductions"
      />
    </main>
  );
}
