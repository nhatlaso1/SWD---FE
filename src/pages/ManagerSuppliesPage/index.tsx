import BasePages from '@/components/shared/base-pages.js';
import { Card } from '@/components/ui/card';

import { DashboardHeader } from './components/dashboard/dashboard-header.js';
import { SupplyTable } from './components/suppiles/supply-table.js';
import { SupplyActions } from './components/suppiles/supply-actions.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ManagerSuppliesPage() {
  return (
    <>
      <BasePages
        className="relative flex-1 space-y-4 overflow-y-auto px-4"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Quản lý vật tư', link: '/Warehouse' }
        ]}
      >
        <div className="flex flex-col gap-4">
          <DashboardHeader
            heading="Quản lý vật tư"
            subheading="Quản lý vật tư nhập và xuất kho."
          />

          <SupplyActions />

          <Card>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Tất cả vật tư</TabsTrigger>
                <TabsTrigger value="incoming">Vật tư nhập</TabsTrigger>
                <TabsTrigger value="outgoing">Vật tư xuất</TabsTrigger>
                <TabsTrigger value="history">Lịch sử</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <SupplyTable type="all" />
              </TabsContent>
              <TabsContent value="incoming">
                <SupplyTable type="incoming" />
              </TabsContent>
              <TabsContent value="outgoing">
                <SupplyTable type="outgoing" />
              </TabsContent>
              <TabsContent value="history">
                <SupplyTable type="history" />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </BasePages>
    </>
  );
}
