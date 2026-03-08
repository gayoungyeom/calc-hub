import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-500">
            © {currentYear} CalcHub. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-700">
              About
            </Link>
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/kr/freelancer-tax-calculator" className="hover:text-gray-700">
              KR 계산기
            </Link>
            <Link href="/us/1099-tax-calculator" className="hover:text-gray-700">
              US Calculator
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          본 사이트의 계산 결과는 참고용이며, 정확한 세무 상담은 전문가에게 문의하세요.
        </p>
      </div>
    </footer>
  );
}
