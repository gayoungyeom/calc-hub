import type { Locale } from '@/lib/locale';

interface Source {
  label: string;
  url: string;
}

interface Props {
  taxYear: number;
  lastUpdated: string;
  sources: Source[];
  calculationMethod: string;
  locale?: Locale;
}

export default function AuthorityBlock({
  taxYear,
  lastUpdated,
  sources,
  calculationMethod,
  locale = 'ko',
}: Props) {
  const isKo = locale === 'ko';

  return (
    <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600 dark:border-dark-border dark:bg-dark-card dark:text-gray-400">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        {isKo ? '계산 기준 및 출처' : 'Calculation Basis & Sources'}
      </h3>

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="font-medium text-gray-700 dark:text-gray-300">
            {isKo ? '적용 세법 연도' : 'Tax Year'}
          </dt>
          <dd>{isKo ? `${taxYear}년` : taxYear}</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-700 dark:text-gray-300">
            {isKo ? '계산 방식' : 'Calculation Method'}
          </dt>
          <dd>{calculationMethod}</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-700 dark:text-gray-300">
            {isKo ? '공식 출처' : 'Official Sources'}
          </dt>
          <dd>
            <ul className="mt-1 space-y-1">
              {sources.map((source, index) => (
                <li key={`${source.url}-${index}`}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-dark-blue"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="font-medium text-gray-700 dark:text-gray-300">
            {isKo ? '마지막 업데이트' : 'Last Updated'}
          </dt>
          <dd>{lastUpdated}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-gray-400 border-t border-gray-200 pt-4 dark:border-dark-border dark:text-gray-500">
        {isKo
          ? '본 계산기는 참고용이며 법적 효력이 없습니다. 정확한 세금 신고 및 납부는 공인 세무사 또는 회계사와 상담하시기 바랍니다.'
          : 'This calculator is for reference only and has no legal effect. Please consult a qualified tax professional for accurate tax filing.'}
      </p>
    </section>
  );
}
