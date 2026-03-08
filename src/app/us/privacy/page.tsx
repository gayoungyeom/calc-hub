import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CalcHub",
  description:
    "CalcHub Privacy Policy. Learn about the information we collect, cookie usage, and advertising data processing.",
};

export default function UsPrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: March 7, 2026
      </p>

      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            1. Overview
          </h2>
          <p className="mt-2">
            CalcHub (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the
            website calchubs.org. This page informs you of our policies regarding
            the collection, use, and disclosure of information when you use our
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            2. Information We Collect
          </h2>
          <p className="mt-2">
            CalcHub does not require user registration or login. We do not
            collect personally identifiable information such as your name, email
            address, or phone number.
          </p>
          <p className="mt-2">
            All tax calculations are performed entirely in your browser. Your
            income data and calculation inputs are never sent to or stored on our
            servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            3. Analytics (Google Analytics 4)
          </h2>
          <p className="mt-2">
            We use Google Analytics 4 (GA4) to understand how visitors interact
            with our website. GA4 may collect the following information
            automatically:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Pages visited and time spent on each page</li>
            <li>Referring website or search terms</li>
            <li>Browser type, operating system, and device type</li>
            <li>Approximate geographic location (country/city level)</li>
            <li>Interaction events (e.g., button clicks, calculator usage)</li>
          </ul>
          <p className="mt-2">
            This data is aggregated and anonymized. We do not use it to identify
            individual users. For more information, see{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            4. Advertising (Google AdSense)
          </h2>
          <p className="mt-2">
            We may display advertisements through Google AdSense on our website.
            Google AdSense uses cookies and similar technologies to serve ads
            based on your prior visits to this and other websites. Google&apos;s
            use of advertising cookies enables it and its partners to serve ads
            based on your browsing history.
          </p>
          <p className="mt-2">
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of third-party cookies by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            5. Cookies
          </h2>
          <p className="mt-2">
            Cookies are small data files stored on your device. We use cookies
            through third-party services (Google Analytics and Google AdSense) as
            described above. CalcHub itself does not set any first-party cookies.
          </p>
          <p className="mt-2">
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, some features of our Service
            may not function properly without cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            6. Third-Party Links
          </h2>
          <p className="mt-2">
            Our website may contain links to external sites (e.g., IRS.gov,
            NTS.go.kr) for reference purposes. We are not responsible for the
            privacy practices of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            7. Children&apos;s Privacy
          </h2>
          <p className="mt-2">
            Our Service is not directed to anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            8. Changes to This Policy
          </h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated &quot;Last updated&quot; date.
            Continued use of the website after changes constitutes acceptance of
            the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            9. Contact
          </h2>
          <p className="mt-2">
            If you have questions about this Privacy Policy, please reach out via
            our{" "}
            <a
              href="https://github.com/gayoungyeom/calc-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-dark-blue"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
