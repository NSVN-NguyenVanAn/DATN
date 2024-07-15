import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from '../utils/ApiFunctions';

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: '',
    bookingConfirmationCode: '',
    room: { id: '', roomType: '' },
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    guestName: '',
    guestEmail: '',
    numOfAdults: '',
    numOfChildren: '',
    totalNumOfGuests: '',
  });

  const emptyBookingInfo = {
    id: '',
    bookingConfirmationCode: '',
    room: { id: '', roomType: '' },
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    guestName: '',
    guestEmail: '',
    numOfAdults: '',
    numOfChildren: '',
    totalNumOfGuests: '',
  };
  const [isDeleted, setIsDeleted] = useState(false);

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      const errorMessage =
        error.response && error.response.status === 404
          ? error.response.data.message
          : 'Không tìm thấy thông tin đặt phòng với mã xác nhận trên';
      setError(errorMessage);
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBookingCancellation = async (bookingId) => {
    console.log(bookingId);
    try {
      await cancelBooking(bookingId);
      setIsDeleted(true);
      setSuccessMessage('Đã huỷ đặt phòng!');
      setBookingInfo(emptyBookingInfo);
      setConfirmationCode('');
      setError(null);
    } catch (error) {
      const errorMessage =
        'Vui lòng liên hệ với khách sạn để huỷ đặt phòng! Số điện thoại : 0971425194.';
      setError(errorMessage);
      console.log(error);
    }
  };

  // useEffect to clear error and success messages after 2 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage('');
        setIsDeleted(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='text-center mb-4'>Tìm kiếm thông tin đặt phòng</h2>
      <form onSubmit={handleFormSubmit} className='col-md-6'>
        <div className='input-group mb-3'>
          <input
            className='form-control'
            type='text'
            id='confirmationCode'
            name='confirmationCode'
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder='Nhập mã xác nhận'
          />
          <button type='submit' className='btn btn-hotel input-group-text'>
            Tìm kiếm
          </button>
        </div>
      </form>

      {isLoading ? (
        <div>Đang tìm kiếm thông tin...</div>
      ) : error ? (
        <div className='text-danger'> {error}</div>
      ) : bookingInfo.bookingConfirmationCode ? (
        <div className='col-md-6 mt-4 mb-5'>
          <h3>Thông tin đặt phòng</h3>
          <p className='text-success'>
            Mã xác nhận: {bookingInfo.bookingConfirmationCode}
          </p>
          <p>Loại phòng: {bookingInfo.room.roomType}</p>
          <p>Số phòng: {bookingInfo.room.roomNo}</p>
          <p>
            Ngày nhận phòng:{' '}
            {moment(bookingInfo.checkInDate)
              .subtract(1, 'month')
              .format('DD/MM/YYYY')}
          </p>
          <p>
            Ngày trả phòng:{' '}
            {moment(bookingInfo.checkInDate)
              .subtract(1, 'month')
              .format('DD/MM/YYYY')}
          </p>
          <p>Tên khách hàng: {bookingInfo.guestName}</p>
          <p>Địa chỉ email: {bookingInfo.guestEmail}</p>
          <p>Người lớn: {bookingInfo.numOfAdults}</p>
          <p>Trẻ em: {bookingInfo.numOfChildren}</p>
          <p>Tổng khách: {bookingInfo.totalNumOfGuests}</p>
          <p>Thanh toán: {bookingInfo.price.toLocaleString('vi-VN')} VND</p>

          {!isDeleted && (
            <button
              onClick={() => handleBookingCancellation(bookingInfo.id)}
              className='btn btn-danger'
            >
              Huỷ đặt phòng
            </button>
          )}
        </div>
      ) : (
        <div>Tìm kiếm thông tin</div>
      )}

      {isDeleted && (
        <div className='alert alert-success mt-3 fade show'>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FindBooking;
