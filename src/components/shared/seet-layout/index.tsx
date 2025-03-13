import { useState, useMemo } from 'react';

const SeatLayout = ({
  title = 'Sơ đồ chuẩn bị sự kiện',
  title1 = 'Ghế còn trống',
  title2 = 'Ghế đã đặt',
  seatTitle1 = 'Còn trống',
  seatTitle2 = 'Đã đặt'
}) => {
  // Seat status types
  const SEAT_STATUS = {
    AVAILABLE: 'available',
    BOOKED: 'booked',
    SELECTED: 'selected',
    PREMIUM: 'premium'
  };

  const rows = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const seatsPerRow = 16;

  const bookedSeatsList = new Set([
    'A3',
    'A4',
    'B7',
    'B8',
    'C10',
    'D2',
    'D3',
    'E5',
    'E6',
    'F12',
    'G1',
    'H14',
    'I9',
    'J16'
  ]);

  // Initial seat data
  const [seats, setSeats] = useState<{
    [key: string]: { id: string; status: string; row: string; number: number };
  }>(() => {
    const initialSeats = {};
    rows.forEach((row) => {
      Array.from({ length: seatsPerRow }).forEach((_, index) => {
        const seatNumber = index + 1;
        const seatId = `${row}${seatNumber}`;
        initialSeats[seatId] = {
          id: seatId,
          status: bookedSeatsList.has(seatId)
            ? SEAT_STATUS.BOOKED
            : SEAT_STATUS.AVAILABLE,
          row: row,
          number: seatNumber
        };
      });
    });
    return initialSeats;
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const seatArray = Object.values(seats);
    return {
      available: seatArray.filter(
        (seat) => seat.status === SEAT_STATUS.AVAILABLE
      ).length,
      booked: seatArray.filter((seat) => seat.status === SEAT_STATUS.BOOKED)
        .length,
      selected: seatArray.filter((seat) => seat.status === SEAT_STATUS.SELECTED)
        .length,
      total: seatArray.length
    };
  }, [seats]);

  // Handle seat click
  const handleSeatClick = (seatId) => {
    setSeats((prev) => ({
      ...prev,
      [seatId]: {
        ...prev[seatId],
        status:
          prev[seatId].status === SEAT_STATUS.AVAILABLE
            ? SEAT_STATUS.SELECTED
            : SEAT_STATUS.AVAILABLE
      }
    }));
  };

  const getSeatColor = (status) => {
    switch (status) {
      case SEAT_STATUS.AVAILABLE:
        return 'bg-gray-200 hover:bg-gray-300';
      case SEAT_STATUS.BOOKED:
        return 'bg-blue';
      case SEAT_STATUS.SELECTED:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="mx-auto  rounded-lg bg-secondary p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">{title}</h2>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-300 p-4">
          <p className="text-sm text-gray-600">{title1}</p>
          <p className="text-2xl font-bold">{stats.available}</p>
        </div>
        <div className="rounded-lg bg-blue/70 p-4">
          <p className="text-sm text-gray-600">{title2}</p>
          <p className="text-2xl font-bold">{stats.booked}</p>
        </div>
        {/* <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-600">Selected</p>
          <p className="text-2xl font-bold">{stats.selected}</p>
        </div> */}
      </div>

      {/* Screen */}
      <div className="mx-auto mb-12 flex h-8 w-3/4 items-center justify-center rounded-lg bg-gray-300 text-sm text-gray-600">
        Sân khấu
      </div>

      {/* Seating Grid */}
      <div className="grid gap-y-2">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <div className="w-6 text-center font-bold">{row}</div>
            <div className="flex flex-1 justify-center gap-2">
              {Array.from({ length: seatsPerRow }).map((_, index) => {
                const seatId = `${row}${index + 1}`;
                const seat = seats[seatId];
                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={seat.status === SEAT_STATUS.BOOKED}
                    className={`h-8 w-8 rounded-t-lg text-xs font-medium
                      ${getSeatColor(seat.status)}
                      ${seat.status === SEAT_STATUS.BOOKED ? 'cursor-not-allowed' : 'cursor-pointer'}
                      transition-colors duration-200
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="w-6 text-center font-bold">{row}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <span className="text-sm">{seatTitle1}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue"></div>
          <span className="text-sm">{seatTitle2}</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-green-500"></div>
          <span className="text-sm">Đang chọn</span>
        </div> */}
      </div>
    </div>
  );
};

export default SeatLayout;
