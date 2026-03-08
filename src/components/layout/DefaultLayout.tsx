import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header locale="en" />
      <div className="flex-1">{children}</div>
      <Footer locale="en" />
    </>
  );
}
