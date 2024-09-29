import { Navbar } from "@/src/components/UI/NavBar";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
