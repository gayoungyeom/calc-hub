import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          프리랜서 세금,
          <br className="sm:hidden" /> 5초 만에 계산하세요
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          한국 종합소득세 환급액부터 미국 1099 Quarterly Tax까지.
          <br />
          계산 결과와 함께 맞춤 절세 인사이트를 제공합니다.
        </p>
      </section>

      {/* Calculator Cards */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        <CalculatorCard
          href="/kr/freelancer-tax-calculator"
          flag="🇰🇷"
          title="종합소득세 계산기"
          description="3.3% 원천징수 프리랜서·N잡러를 위한 종합소득세 간편 계산. 예상 환급액을 확인하세요."
          tags={["종합소득세", "3.3% 환급", "프리랜서"]}
        />
        <CalculatorCard
          href="/us/1099-tax-calculator"
          flag="🇺🇸"
          title="1099 Tax Calculator"
          description="Calculate federal, SE, and state taxes for self-employed. Get your quarterly estimated payments."
          tags={["1099 Tax", "Self-Employed", "Quarterly"]}
        />
      </section>

      {/* Trust Signals */}
      <section className="mt-16 text-center">
        <div className="grid grid-cols-3 gap-8 text-sm text-gray-500">
          <div>
            <p className="text-2xl font-bold text-gray-900">2026</p>
            <p>최신 세법 기준</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">5초</p>
            <p>즉시 계산 결과</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p>무료 이용</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function CalculatorCard({
  href,
  flag,
  title,
  description,
  tags,
}: {
  href: string;
  flag: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-md"
    >
      <span className="text-3xl">{flag}</span>
      <h2 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
