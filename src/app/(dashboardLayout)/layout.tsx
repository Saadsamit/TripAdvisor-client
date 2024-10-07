import DashboardLayout from "@/src/components/modules/dashboard/DashboardLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex">
        <DashboardLayout />
        <div className="w-full md:ml-64 sm:ml-52 ml-36 p-4 overflow-x-auto">{children}</div>
      </div>
    </main>
  );
}
