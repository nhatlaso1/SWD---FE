'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Timeline({ title, initialMilestones }) {
  // State lưu các timeline items
  const [milestones, setMilestones] = useState(initialMilestones);

  // State điều khiển dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' | 'edit' | 'delete'
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(null);

  // State lưu dữ liệu trong form của dialog (cho thêm/sửa)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    day: '',
    month: '',
    year: '',
    timeStart: '',
    timeEnd: '',
    handleBy: '',
    phone: '',
    position: 'left'
  });

  // Hàm thay đổi trạng thái hoàn thành của timeline
  const toggleCompletion = (index) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, i) =>
        i === index
          ? { ...milestone, isReached: !milestone.isReached }
          : milestone
      )
    );
  };

  // Xuất Excel
  const exportToExcel = () => {
    const data = milestones.map((milestone, index) => ({
      STT: index + 1,
      'Tiêu đề': milestone.title,
      'Mô tả': milestone.description,
      'Ngày diễn ra': `${milestone.date.day}/${milestone.date.month}/${milestone.date.year}`,
      'Thời gian': milestone.timeStart
        ? `${milestone.timeStart} - ${milestone.timeEnd}`
        : '08:00 - 17:00',
      'Người phụ trách': milestone.handleBy || 'Henry',
      SĐT: milestone.phone || '09147888999',
      'Trạng thái': milestone.isReached ? 'Đã hoàn thành' : 'Chưa hoàn thành'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Timeline');

    XLSX.writeFile(wb, `Timeline_${title.replace(/\s/g, '_')}.xlsx`);
  };

  // Mở dialog cho thao tác thêm mới
  const openAddDialog = () => {
    setDialogMode('add');
    setFormData({
      title: '',
      description: '',
      day: '',
      month: '',
      year: '',
      timeStart: '',
      timeEnd: '',
      handleBy: '',
      phone: '',
      position: 'left'
    });
    setSelectedMilestoneIndex(null);
    setDialogOpen(true);
  };

  // Mở dialog cho thao tác sửa (dữ liệu sẽ được nạp từ item được chọn)
  const openEditDialog = (index) => {
    const milestone = milestones[index];
    setDialogMode('edit');
    setFormData({
      title: milestone.title,
      description: milestone.description,
      day: milestone.date.day,
      month: milestone.date.month,
      year: milestone.date.year,
      timeStart: milestone.timeStart || '',
      timeEnd: milestone.timeEnd || '',
      handleBy: milestone.handleBy || '',
      phone: milestone.phone || '',
      position: milestone.position || 'left'
    });
    setSelectedMilestoneIndex(index);
    setDialogOpen(true);
  };

  // Mở dialog xác nhận xóa
  const openDeleteDialog = (index) => {
    setDialogMode('delete');
    setSelectedMilestoneIndex(index);
    setDialogOpen(true);
  };

  // Xử lý submit form thêm/sửa
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newMilestone = {
      title: formData.title,
      description: formData.description,
      date: {
        day: formData.day,
        month: formData.month,
        year: formData.year
      },
      timeStart: formData.timeStart,
      timeEnd: formData.timeEnd,
      handleBy: formData.handleBy,
      phone: formData.phone,
      position: formData.position,
      isReached: false
    };

    if (dialogMode === 'add') {
      setMilestones([...milestones, newMilestone]);
    } else if (dialogMode === 'edit') {
      setMilestones(
        milestones.map((m, i) =>
          i === selectedMilestoneIndex ? newMilestone : m
        )
      );
    }
    setDialogOpen(false);
  };

  // Xử lý xóa timeline item
  const handleDelete = () => {
    setMilestones(milestones.filter((_, i) => i !== selectedMilestoneIndex));
    setDialogOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-secondary p-4 md:p-8">
      <div className="relative mx-auto">
        {/* Tiêu đề trang */}
        <div className="relative mb-6 flex w-full items-center justify-center text-center">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            {title}
          </h1>

          {/* Nút Thêm Timeline (ở góc trái) */}
          <button
            onClick={openAddDialog}
            className="absolute left-0 top-0 flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            Thêm Timeline
          </button>

          {/* Nút Xuất Excel (ở góc phải) */}
          <button
            onClick={exportToExcel}
            className="absolute right-0 top-0 flex items-center gap-2 rounded-md bg-blue/80 px-4 py-2 text-white transition hover:bg-blue"
          >
            <Download size={18} /> Xuất Excel
          </button>
        </div>

        <div className="relative">
          {/* Dòng dọc ở giữa */}
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform bg-gray-200" />

          {/* Các timeline item */}
          <div className="relative">
            {milestones?.map((milestone, index) => (
              <div key={index} className="mb-16">
                <div
                  className={`flex items-center ${
                    milestone.position === 'right' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Nội dung timeline */}
                  <div
                    className={`w-5/12 ${
                      milestone.position === 'right' ? 'pl-8' : 'pr-8'
                    }`}
                  >
                    <Card
                      className={`p-4 transition-shadow hover:shadow-lg ${
                        milestone.isReached ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Tiêu đề và ngày */}
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {milestone.title}
                        </h3>
                        <div className="text-sm text-gray-600">
                          {milestone.date.month} {milestone.date.day}
                          <div className="text-right">
                            {milestone.date.year}
                          </div>
                        </div>
                      </div>

                      <p className="mb-3 text-sm text-gray-600">
                        {milestone.description}
                      </p>

                      <p className="mb-3 text-sm text-gray-600">
                        Thời gian diễn ra
                        {(milestone.timeStart &&
                          ` từ ${milestone.timeStart} đến ${milestone.timeEnd}`) ||
                          ' : 08:00 - 17:00'}
                      </p>

                      <p className="text-muted-foreground">
                        Người phụ trách : {milestone.handleBy || 'Henry'}
                      </p>
                      <p className="text-muted-foreground">
                        SĐT : {milestone.phone || '09147888999'}
                      </p>

                      {/* Nút đánh dấu hoàn thành */}
                      <button
                        onClick={() => toggleCompletion(index)}
                        className={`mt-4 w-full rounded-md px-4 py-2 text-white transition ${
                          milestone.isReached
                            ? 'cursor-not-allowed bg-gray-400'
                            : 'bg-blue/80 hover:bg-blue'
                        }`}
                        disabled={milestone.isReached}
                      >
                        {milestone.isReached
                          ? 'Đã hoàn thành'
                          : 'Đánh dấu đã hoàn thành'}
                      </button>

                      {/* Nút Sửa và Xóa */}
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => openEditDialog(index)}
                          className="text-blue-600 hover:underline"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => openDeleteDialog(index)}
                          className="text-red-600 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </Card>
                  </div>

                  {/* Chấm giữa */}
                  <div className="flex w-2/12 justify-center">
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        milestone.isReached
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 bg-white'
                      } relative z-10`}
                    />
                  </div>

                  {/* Không gian căn lề */}
                  <div className="w-5/12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog dùng chung cho Thêm / Sửa / Xóa */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {dialogMode === 'delete' ? (
            <>
              <DialogHeader>
                <DialogTitle>Xóa Timeline</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn xóa timeline này? Hành động này không
                  thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Xóa
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === 'add' ? 'Thêm Timeline' : 'Sửa Timeline'}
                </DialogTitle>
                <DialogDescription>
                  {dialogMode === 'add'
                    ? 'Nhập thông tin mới cho timeline.'
                    : 'Chỉnh sửa thông tin timeline.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày
                    </label>
                    <input
                      type="text"
                      value={formData.day}
                      onChange={(e) =>
                        setFormData({ ...formData, day: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tháng
                    </label>
                    <input
                      type="text"
                      value={formData.month}
                      onChange={(e) =>
                        setFormData({ ...formData, month: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Năm
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Thời gian bắt đầu
                    </label>
                    <input
                      type="text"
                      value={formData.timeStart}
                      onChange={(e) =>
                        setFormData({ ...formData, timeStart: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Thời gian kết thúc
                    </label>
                    <input
                      type="text"
                      value={formData.timeEnd}
                      onChange={(e) =>
                        setFormData({ ...formData, timeEnd: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Người phụ trách
                  </label>
                  <input
                    type="text"
                    value={formData.handleBy}
                    onChange={(e) =>
                      setFormData({ ...formData, handleBy: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SĐT
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setDialogOpen(false)}
                  type="button"
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {dialogMode === 'add' ? 'Thêm' : 'Lưu'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
