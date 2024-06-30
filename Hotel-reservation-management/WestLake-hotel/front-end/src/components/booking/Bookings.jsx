import React, { useState, useEffect } from 'react';
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions';
import Header from '../common/Header';
import BookingsTable from './BookingsTable';

const Bookings = () => {
  const [bookingInfo, setBookingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError('Lỗi : Không tải được danh sách đặt phòng');
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      const data = await getAllBookings();
      setBookingInfo(data);
    } catch (error) {
      setError('Lỗi : không tải được danh sách đặt phòng');
    }
  };

  return (
    <section style={{ backgroundColor: 'whitesmoke' }}>
      <Header title={'Quản lý đặt phòng'} />
      {error && <div className='text-danger'>{error}</div>}
      {isLoading ? (
        <div>Đang tải danh sách đặt phòng</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};

export default Bookings;
