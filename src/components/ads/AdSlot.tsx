interface Props {
  position: "top-banner" | "below-result" | "in-feed" | "bottom-anchor";
  className?: string;
}

/**
 * 광고 슬롯 placeholder.
 * Phase 3에서 AdSense 코드로 교체 예정.
 * 프로덕션에서는 빈 div로 렌더링 (레이아웃 자리 확보 용도).
 */
export default function AdSlot({ position, className = "" }: Props) {
  if (process.env.NODE_ENV === "production") {
    return (
      <div
        data-ad-slot={position}
        className={className}
        aria-hidden="true"
      />
    );
  }

  // 개발 환경에서만 placeholder 표시
  return (
    <div
      data-ad-slot={position}
      className={`flex items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500 ${className}`}
      style={{ minHeight: position === "top-banner" ? 90 : 250 }}
    >
      AD: {position}
    </div>
  );
}
