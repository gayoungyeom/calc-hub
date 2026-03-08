import type { Metadata } from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";

export const metadata: Metadata = {
  title: "Terms of Service — CalcHub",
  description: "CalcHub 이용약관. 서비스 이용 조건, 면책 사항, 지적재산권에 대해 안내합니다.",
};

export default function TermsPage() {
  return (
    <DefaultLayout>
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: March 8, 2026</p>

      <div className="mt-8 space-y-8 text-gray-700 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2">
            By accessing and using CalcHub (calchubs.org), you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not
            use our website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            2. Description of Service
          </h2>
          <p className="mt-2">
            CalcHub provides free online tax calculators for freelancers and
            self-employed individuals. Our calculators cover Korean comprehensive
            income tax and US 1099 self-employment tax. All calculations are performed
            in your browser and are intended for informational and educational purposes
            only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            3. Disclaimer of Accuracy
          </h2>
          <p className="mt-2">
            While we strive to ensure the accuracy of our tax calculations based on
            official tax laws and regulations, CalcHub does not guarantee the
            correctness, completeness, or timeliness of any calculation results.
          </p>
          <p className="mt-2">
            Tax laws change frequently, and individual circumstances vary. The results
            provided by our calculators should not be considered as tax advice, legal
            advice, or a substitute for consultation with a qualified tax professional,
            certified public accountant (CPA), or licensed tax advisor.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            4. Limitation of Liability
          </h2>
          <p className="mt-2">
            CalcHub, its operators, and contributors shall not be held liable for any
            direct, indirect, incidental, or consequential damages arising from the use
            of or inability to use our Service, including but not limited to financial
            losses resulting from reliance on calculation results.
          </p>
          <p className="mt-2">
            You acknowledge that you use CalcHub at your own risk and are solely
            responsible for any tax filing decisions you make.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            5. Intellectual Property
          </h2>
          <p className="mt-2">
            All content on CalcHub, including text, design, logos, and code, is the
            property of CalcHub and is protected by applicable intellectual property
            laws. You may not reproduce, distribute, or create derivative works without
            prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            6. Third-Party Services
          </h2>
          <p className="mt-2">
            CalcHub uses third-party services including Google Analytics for website
            analytics and Google AdSense for advertising. Your use of our website is
            also subject to the terms and privacy policies of these third-party
            services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            7. Modifications
          </h2>
          <p className="mt-2">
            We reserve the right to modify these Terms of Service at any time. Changes
            will be posted on this page with an updated date. Continued use of the
            website after modifications constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Contact</h2>
          <p className="mt-2">
            If you have questions about these Terms of Service, please reach out via
            our{" "}
            <a
              href="https://github.com/gayoungyeom/calc-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>
      </div>
    </main>
    </DefaultLayout>
  );
}
