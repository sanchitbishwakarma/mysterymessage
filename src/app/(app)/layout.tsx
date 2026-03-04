import Navbar from "@/components/Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}
  
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
