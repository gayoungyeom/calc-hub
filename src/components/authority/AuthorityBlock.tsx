interface Source {
  label: string;
  url: string;
}

interface Props {
  taxYear: number;
  lastUpdated: string;
  sources: Source[];
  calculationMethod: string;
}

export default function AuthorityBlock({
  taxYear,
  lastUpdated,
  sources,
  calculationMethod,
}: Props) {
  return (
    <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
      <h3 className="font-semibold text-gray-900">계산 기준 및 출처</h3>

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="font-medium text-gray-700">적용 세법 연도</dt>
          <dd>{taxYear}년</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-700">계산 방식</dt>
          <dd>{calculationMethod}</dd>
        </div>

        <div>
          <dt className="font-medium text-gray-700">공식 출처</dt>
          <dd>
            <ul className="mt-1 space-y-1">
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="font-medium text-gray-700">마지막 업데이트</dt>
          <dd>{lastUpdated}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-gray-400 border-t border-gray-200 pt-4">
        본 계산기는 참고용이며 법적 효력이 없습니다. 정확한 세금 신고 및 납부는
        공인 세무사 또는 회계사와 상담하시기 바랍니다.
      </p>
    </section>
  );
}
