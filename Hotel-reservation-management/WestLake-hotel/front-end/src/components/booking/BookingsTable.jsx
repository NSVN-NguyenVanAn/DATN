import { parseISO } from 'date-fns';
import React, { useState, useEffect } from 'react';
import DateSlider from '../common/DateSlider';
import moment from 'moment';

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
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
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
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
            <th>Số người</th>
            <th>Thanh toán</th>
            <th>Mã xác nhận</th>
          </tr>
        </thead>
        <tbody className='text-left'>
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.room.roomType}</td>
              <td>{booking.room.roomNo}</td>
              <td>{moment(booking.checkInDate).format('DD/MM/YYYY')}</td>
              <td>{moment(booking.checkOutDate).format('DD/MM/YYYY')}</td>
              <td>{booking.guestName}</td>
              <td>{booking.guestEmail}</td>
              <td>{booking.totalNumOfGuests}</td>
              <td>{booking.price.toLocaleString('vi-VN')} VND</td>
              <td>{booking.bookingConfirmationCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.length === 0 && (
        <p> Không có phòng nào được đặt trong khoảng thời gian vừa chọn</p>
      )}
    </section>
  );
};

export default BookingsTable;
