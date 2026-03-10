import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KrVatCalculator from "@/components/kr/vat/KrVatCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import RelatedLink from "@/components/common/RelatedLink";
import FaqSection from "@/components/common/FaqSection";
import FaqSchema from "@/components/common/FaqSchema";
import pages from "@/config/longtail/kr-vat-pages.json";

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
          ko: `/kr/vat-calculator/${slug}`,
          en: "/us",
          "x-default": "/",
        },
      },
    };
  });
}

export default async function KrVatLongtailPage({
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

      <KrVatCalculator />

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
              href="/kr/vat-calculator"
              label="부가가치세 계산기"
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
                href={`/kr/vat-calculator/${p.slug}`}
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
          { label: "국세청 부가가치세 안내", url: "https://www.nts.go.kr" },
          { label: "부가가치세법 제29조~제37조", url: "https://www.law.go.kr" },
        ]}
        calculationMethod="일반: 매출세액(10%) - 매입세액(10%) = 납부세액 | 간이: 매출 × 부가가치율 × 10% - 매입공제"
      />
    </main>
  );
}
