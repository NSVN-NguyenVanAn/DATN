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
          <tr>
            <th>STT</th>
            <th>ID đặt phòng</th>
            <th>ID phòng</th>
            <th>Loại phòng</th>
            <th>Ngày nhận</th>
            <th>Ngày trả</th>
            <th>Tên khách hàng</th>
            <th>Email khách hàng</th>
            <th>Người lớn</th>
            <th>Trẻ em</th>
            <th>Tổng</th>
            <th>Mã xác nhận</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.id}</td>
              <td>{booking.room.id}</td>
              <td>{booking.room.roomType}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.guestName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.numOfAdults}</td>
              <td>{booking.numOfChildren}</td>
              <td>{booking.totalNumOfGuests}</td>
              <td>{booking.bookingConfirmationCode}</td>
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
