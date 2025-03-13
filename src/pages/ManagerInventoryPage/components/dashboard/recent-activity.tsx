import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    type: 'inventory',
    description: 'Thêm 50 đơn vị Sản phẩm A vào kho hàng',
    timestamp: '2 giờ trước',
    status: 'Hoàn thành'
  },
  {
    id: 2,
    type: 'supply',
    description: 'Nhận lô hàng #12345 từ Nhà cung cấp XYZ',
    timestamp: '4 giờ trước',
    status: 'Hoàn thành'
  },
  {
    id: 3,
    type: 'inventory',
    description: 'Xuất 25 đơn vị Sản phẩm B khỏi kho',
    timestamp: 'Hôm qua',
    status: 'Hoàn thành'
  },
  {
    id: 4,
    type: 'supply',
    description: 'Chuẩn bị đơn hàng xuất #67890 cho Khách hàng ABC',
    timestamp: 'Hôm qua',
    status: 'Đang chờ'
  },
  {
    id: 5,
    type: 'inventory',
    description: 'Cập nhật vị trí Sản phẩm C sang Kho B',
    timestamp: '2 ngày trước',
    status: 'Hoàn thành'
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 rounded-lg border p-3"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{activity.description}</p>
              <Badge
                variant={
                  activity.status === 'Hoàn thành' ? 'default' : 'outline'
                }
              >
                {activity.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
