import Container from "@/src/components/UI/Container";
import AuthLayoutHeader from "./_layoutHeader/AuthLayoutHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="fixed inset-0 z-50 backdrop-blur-sm overflow-y-auto">
      <AuthLayoutHeader />
      <Container>
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          {children}
        </div>
      </Container>
    </main>
  );
}
