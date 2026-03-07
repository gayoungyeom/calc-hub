import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import KrCalculator from "@/components/kr/KrCalculator";
import AuthorityBlock from "@/components/authority/AuthorityBlock";
import krPages from "@/config/longtail/kr-pages.json";

interface PageData {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
}

export function generateStaticParams() {
  return krPages.map((page: PageData) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = krPages.find((p: PageData) => p.slug === slug);
    if (!page) return {};
    return {
      title: `${page.title} — CalcHub`,
      description: page.description,
      keywords: page.keywords,
    };
  });
}

export default async function KrLongtailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = krPages.find((p: PageData) => p.slug === slug);
  if (!page) notFound();

  const otherPages = krPages
    .filter((p: PageData) => p.slug !== slug)
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {page.h1}
        </h1>
        <p className="mt-2 text-gray-600">{page.description}</p>
        <p className="mt-1 text-sm text-gray-400">2026년 세법 기준</p>
      </div>

      <KrCalculator />

      {/* 관련 계산기 내부 링크 */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900">
          관련 세금 계산기
        </h2>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/kr/freelancer-tax-calculator"
              className="text-sm text-blue-600 hover:underline"
            >
              프리랜서 종합소득세 계산기
            </Link>
          </li>
          {otherPages.map((p: PageData) => (
            <li key={p.slug}>
              <Link
                href={`/kr/${p.slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {p.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AuthorityBlock
        taxYear={2026}
        lastUpdated="2026-01-10"
        sources={[
          { label: "국세청 종합소득세 세율표", url: "https://www.nts.go.kr" },
          { label: "소득세법 제55조 (세율)", url: "https://www.law.go.kr" },
        ]}
        calculationMethod="총수입 → 필요경비 차감 → 소득공제 → 과세표준 × 누진세율 → 산출세액 → 기납부세액 차감"
      />
    </main>
  );
}
