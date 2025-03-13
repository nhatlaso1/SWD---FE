import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { FileQuestion, Trash2 } from 'lucide-react';

export function Instruction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="bg-gray-100 hover:bg-gray-200"
        >
          <FileQuestion className="h-6 w-6" stroke="orange" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Hướng dẫn sử dụng</DialogTitle>
          <DialogDescription>
            Hướng dẫn sử dụng giao diện quản lý sự kiện
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Hướng dẫn sử dụng giao diện quản lý sự kiện
          </h2>
          <ul className="list-inside list-disc space-y-3 text-gray-700">
            <li>
              <strong className="text-blue ">Thêm phiên mới:</strong> Nhấn vào
              nút{' '}
              <span className="rounded bg-blue px-2 py-1 text-white">
                + Thêm phiên mới
              </span>{' '}
              để tạo một phiên hội thảo hoặc sự kiện mới.
            </li>
            <li>
              <strong className="text-blue">Chỉnh sửa phiên:</strong> Nhấn vào
              nút{' '}
              <span className="rounded bg-gray-300 px-2 py-1 text-gray-800">
                Sửa
              </span>{' '}
              bên cạnh từng sự kiện trong phiên để chỉnh sửa nội dung.
            </li>
            <li>
              <strong className="text-blue">Xóa phiên:</strong> Nhấn vào nút{' '}
              <span className="rounded bg-red px-2 py-1 text-white">
                Xóa phiên
              </span>{' '}
              để xóa toàn bộ phiên hội thảo hoặc sự kiện.
            </li>
            <li>
              <strong className="text-blue">Thêm sự kiện vào một phiên:</strong>{' '}
              Nhấn vào nút{' '}
              <span className="rounded bg-blue px-2 py-1 text-white">
                + Thêm sự kiện
              </span>{' '}
              bên dưới mỗi phiên để thêm sự kiện mới vào phiên đó.
            </li>
            <li>
              <strong className="text-blue">Xóa sự kiện:</strong> Nhấn vào biểu
              tượng{' '}
              <Button
                size="icon"
                className="rounded bg-gray-300 px-2 py-1 text-gray-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>{' '}
              bên cạnh mỗi sự kiện để xóa sự kiện đó khỏi phiên.
            </li>
            <li>
              <strong className="text-blue">Chỉnh sửa sự kiện:</strong> Nhấn vào
              nút{' '}
              <span className="rounded bg-gray-300 px-2 py-1 text-gray-800">
                Sửa
              </span>{' '}
              bên cạnh một sự kiện để thay đổi nội dung hoặc thời gian của sự
              kiện đó.
            </li>
            <li>
              <strong className="text-blue">Chọn sự kiện:</strong> Nhấn vào ô{' '}
              <span className="rounded bg-gray-300 px-2 py-1 text-gray-800">
                ☑
              </span>{' '}
              bên cạnh mỗi sự kiện để chọn nhiều sự kiện cùng lúc.
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
