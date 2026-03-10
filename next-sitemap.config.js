/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://calchubs.org",
  generateRobotsTxt: false, // 수동 관리
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // 메인 계산기 페이지 — 최고 priority
    if (
      path === "/kr/freelancer-tax-calculator" ||
      path === "/us/1099-tax-calculator"
    ) {
      return { loc: path, changefreq: "monthly", priority: 1.0, lastmod: config.autoLastmod ? new Date().toISOString() : undefined };
    }

    // 홈 + 국가 홈
    if (path === "/" || path === "/kr" || path === "/us") {
      return { loc: path, changefreq: "monthly", priority: 0.9, lastmod: config.autoLastmod ? new Date().toISOString() : undefined };
    }

    // 롱테일 계산기 페이지
    if (path.startsWith("/kr/") || path.startsWith("/us/")) {
      const isUtilityPage = ["/about", "/privacy", "/terms"].some((p) => path.endsWith(p));
      if (!isUtilityPage) {
        return { loc: path, changefreq: "monthly", priority: 0.8, lastmod: config.autoLastmod ? new Date().toISOString() : undefined };
      }
    }

    // 유틸리티 페이지 (about, privacy, terms)
    return { loc: path, changefreq: "yearly", priority: 0.3, lastmod: config.autoLastmod ? new Date().toISOString() : undefined };
  },
};
