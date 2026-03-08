import Link from "next/link";
import DefaultLayout from "@/components/layout/DefaultLayout";

export default function NotFound() {
  return (
    <DefaultLayout>
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Page not found
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-dark-btn dark:hover:bg-dark-btn-hover transition-colors"
        >
          Go Home
        </Link>
      </main>
    </DefaultLayout>
  );
}
