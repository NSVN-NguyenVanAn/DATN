import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import vi from 'date-fns/locale/vi'; // Import the Vietnamese locale

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    });
    onDateChange(null, null);
    onFilterChange(null, null);
  };

  return (
    <>
      <h5>Lọc thông tin đặt phòng</h5>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className='mb-4'
      />
      <button className='btn btn-secondary' onClick={handleClearFilter}>
        Xóa bộ lọc
      </button>
    </>
  );
};

export default DateSlider;
