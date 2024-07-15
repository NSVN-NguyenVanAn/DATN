import { parseISO } from 'date-fns';
import React, { useState, useEffect } from 'react';
import DateSlider from '../common/DateSlider';

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBooknigs = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStarDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStarDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className='p-4'>
      <DateSlider
        onDateChange={filterBooknigs}
        onFilterChange={filterBooknigs}
      />
      <table className='table table-bordered table-hover shadow'>
        <thead>
          <tr className='text-center'>
            <th>STT</th>
            <th>Loại phòng</th>
            <th>Số phòng</th>
            <th>Ngày nhận</th>
            <th>Ngày trả</th>
            <th>Tên khách hàng</th>
            <th>Email khách hàng</th>
            <th>Người lớn</th>
            <th>Trẻ em</th>
            <th>Thanh toán</th>
            <th>Mã xác nhận</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td className='text-left'>{index + 1}</td>
              <td className='text-left'>{booking.room.roomType}</td>
              <td className='text-left'>{booking.room.roomNo}</td>
              <td className='text-left'>{booking.checkInDate}</td>
              <td className='text-left'>{booking.checkOutDate}</td>
              <td className='text-left'>{booking.guestName}</td>
              <td className='text-left'>{booking.guestEmail}</td>
              <td className='text-left'>{booking.numOfAdults}</td>
              <td className='text-left'>{booking.numOfChildren}</td>
              <td className='text-left'>
                {booking.price.toLocaleString('vi-VN')} VND
              </td>
              <td className='text-left'>{booking.bookingConfirmationCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterBooknigs.length === 0 && (
        <p> Không có phòng nào được đặt trong khoảng thời gian vừa chọn</p>
      )}
    </section>
  );
};

export default BookingsTable;
