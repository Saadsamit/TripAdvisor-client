import Footer from "@/src/components/UI/Footer";
import Navbar from "@/src/components/UI/NavBar";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div className="min-h-[calc(100vh-345px)]">
      {children}
      </div>
      <Footer />
    </main>
  );
}
