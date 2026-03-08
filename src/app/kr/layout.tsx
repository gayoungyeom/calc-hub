import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function KrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header locale="ko" />
      <div className="flex-1">{children}</div>
      <Footer locale="ko" />
    </>
  );
}
