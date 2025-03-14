import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '../shared/app-sidebar';
import __helpers from '@/helpers';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const defaultOpen = __helpers.cookie_get('sidebar:state') === 'true';

  return (
    <div className="flex h-full min-h-screen  ">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
