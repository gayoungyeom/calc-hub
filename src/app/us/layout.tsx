import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function UsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header locale="en" />
      <div className="flex-1">{children}</div>
      <Footer locale="en" />
    </>
  );
}
