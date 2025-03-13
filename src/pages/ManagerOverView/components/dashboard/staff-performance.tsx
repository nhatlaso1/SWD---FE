import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const staffData = [
  {
    name: 'Nguyễn Văn A',
    role: 'Quản lý kho',
    performance: 92,
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'NA'
  },
  {
    name: 'Trần Thị B',
    role: 'Chuyên viên kiểm kê',
    performance: 88,
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'TB'
  },
  {
    name: 'Lê Văn C',
    role: 'Điều phối chuỗi cung ứng',
    performance: 85,
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'LC'
  },
  {
    name: 'Hoàng Minh D',
    role: 'Giám sát vận chuyển',
    performance: 79,
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'HD'
  },
  {
    name: 'Phạm Quốc E',
    role: 'Nhân viên giao nhận',
    performance: 76,
    avatar: '/placeholder.svg?height=40&width=40',
    initials: 'PE'
  }
];

export function StaffPerformance() {
  return (
    <div className="space-y-4">
      {staffData.map((staff) => (
        <div key={staff.name} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={staff.avatar} alt={staff.name} />
            <AvatarFallback>{staff.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{staff.name}</p>
              <span className="text-sm font-medium">{staff.performance}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{staff.role}</p>
            <Progress value={staff.performance} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
