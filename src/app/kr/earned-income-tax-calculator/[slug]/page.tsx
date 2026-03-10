import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KrEarnedIncomeCalculator from "@/components/kr/earned-income/KrEarnedIncomeCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import pages from "@/config/longtail/kr-earned-income-pages.json";

interface FaqItem {
  question: string;
  answer: string;
}

interface PageData {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  faq?: FaqItem[];
}

export function generateStaticParams() {
  return pages.map((page: PageData) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = pages.find((p: PageData) => p.slug === slug);
    if (!page) return {};
    return {
      title: `${page.title} — CalcHub`,
      description: page.description,
      keywords: page.keywords,
      alternates: {
        languages: {
          ko: `/kr/earned-income-tax-calculator/${slug}`,
          en: "/us",
          "x-default": "/",
        },
      },
    };
  });
}

export default async function KrEarnedIncomeLongtailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((p: PageData) => p.slug === slug);
  if (!page) notFound();

  const otherPages = pages
    .filter((p: PageData) => p.slug !== slug)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {page.h1}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{page.description}</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">2026년 세법 기준</p>
      </div>

      <KrEarnedIncomeCalculator />

      {/* FAQ */}
      {page.faq && page.faq.length > 0 && (
        <>
          <FaqSection title="자주 묻는 질문" items={page.faq} />
          <FaqSchema items={page.faq} />
        </>
      )}

      {/* 관련 계산기 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          관련 세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <RelatedLink
              href="/kr/earned-income-tax-calculator"
              label="근로소득세 계산기"
              from={slug}
            />
          </li>
          <li>
            <RelatedLink
              href="/kr/freelancer-tax-calculator"
              label="프리랜서 종합소득세 계산기"
              from={slug}
            />
          </li>
          {otherPages.map((p: PageData) => (
            <li key={p.slug}>
              <RelatedLink
                href={`/kr/earned-income-tax-calculator/${p.slug}`}
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
        sources={[
          { label: "국세청 근로소득세 안내", url: "https://www.nts.go.kr" },
          { label: "소득세법 제47조 (근로소득공제)", url: "https://www.law.go.kr" },
        ]}
        calculationMethod="총급여 → 근로소득공제 → 소득공제 → 과세표준 × 누진세율 → 산출세액 → 세액공제 → 결정세액"
      />
    </main>
  );
}
