import BasePages from '@/components/shared/base-pages.js';
import { Card } from '@/components/ui/card';

import { DashboardHeader } from './components/dashboard/dashboard-header.js';
import { InventoryTable } from './components/inventory/inventory-table.js';
import { InventoryFilters } from './components/inventory/inventory-filters.js';

export default function ManagerInventoryPage() {
  return (
    <>
      <BasePages
        className="relative flex-1 space-y-4 overflow-y-auto px-4"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Quản lý tồn kho', link: '/Warehouse' }
        ]}
      >
        <div className="flex flex-col gap-4">
          <DashboardHeader
            heading="Quản lý tồn kho"
            subheading="Xem và quản lý hàng tồn kho hiện tại của bạn."
          />

          <Card>
            <InventoryFilters />
            <InventoryTable />
          </Card>
        </div>
      </BasePages>
    </>
  );
}
