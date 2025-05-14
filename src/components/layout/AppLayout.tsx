
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav onMenuClick={toggleSidebar} />
      <div className="flex">
        <Sidebar open={sidebarOpen} />
        <main className={`flex-1 p-3 sm:p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-60' : 'md:ml-16'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
