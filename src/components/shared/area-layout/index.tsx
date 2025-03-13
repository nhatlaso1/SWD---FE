import { useState } from 'react';
import { Card } from '@/components/ui/card';

const AreaLayout = () => {
  // Danh sách khu vực & sức chứa tối đa
  const initialAreas = [
    { id: 'A', name: 'Khu A', currentCount: 20, maxCapacity: 50 },
    { id: 'B', name: 'Khu B', currentCount: 50, maxCapacity: 50 }, // Full
    { id: 'C', name: 'Khu C', currentCount: 30, maxCapacity: 80 },
    { id: 'VIP', name: 'Khu VIP', currentCount: 10, maxCapacity: 20 },
    { id: 'Main', name: 'Khu Cổng Chính', currentCount: 40, maxCapacity: 40 } // Full
  ];

  const [areas, setAreas] = useState(initialAreas);

  // Thêm người vào khu vực
  const addPerson = (areaId) => {
    setAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === areaId && area.currentCount < area.maxCapacity
          ? { ...area, currentCount: area.currentCount + 1 }
          : area
      )
    );
  };

  // Giảm số người trong khu vực
  const removePerson = (areaId) => {
    setAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === areaId && area.currentCount > 0
          ? { ...area, currentCount: area.currentCount - 1 }
          : area
      )
    );
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-secondary p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">Sơ đồ khu vực</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => {
          const isFull = area.currentCount >= area.maxCapacity;
          return (
            <Card
              key={area.id}
              className={`relative p-6 text-center ${
                isFull ? 'bg-red-300' : 'bg-gray-100'
              }`}
            >
              <h3 className="text-xl font-bold">{area.name}</h3>
              <p className="mt-2 text-gray-600">
                {area.currentCount} / {area.maxCapacity} người
              </p>
              {isFull && (
                <div className="bg-red-600 absolute right-2 top-2 rounded px-2 py-1 text-sm text-white">
                  FULL
                </div>
              )}

              {/* Nút điều chỉnh số lượng */}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="rounded bg-gray-300 px-3 py-1 text-black hover:bg-gray-400 disabled:opacity-50"
                  onClick={() => removePerson(area.id)}
                  disabled={area.currentCount === 0}
                >
                  -
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 rounded px-3 py-1 text-white disabled:opacity-50"
                  onClick={() => addPerson(area.id)}
                  disabled={isFull}
                >
                  +
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AreaLayout;
