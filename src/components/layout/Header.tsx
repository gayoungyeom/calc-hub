import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-gray-900">
          CalcHub
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link
            href="/kr/freelancer-tax-calculator"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            KR 종합소득세
          </Link>
          <Link
            href="/us/1099-tax-calculator"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            US 1099 Tax
          </Link>
        </div>
      </nav>
    </header>
  );
}
