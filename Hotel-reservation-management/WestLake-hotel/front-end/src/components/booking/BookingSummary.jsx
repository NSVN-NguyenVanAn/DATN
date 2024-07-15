import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, 'days');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      onConfirm();
      setIsProcessingPayment(false);
    }, 1000);
  };

  return (
    <div className='row'>
      <div className='col-md-6'></div>
      <div className='card card-body mt-5'>
        <h4 className='card-title hotel-color'>Thông tin đặt phòng</h4>
        <p>
          Họ tên: <strong>{booking.guestFullName}</strong>
        </p>
        <p>
          Email: <strong>{booking.guestEmail}</strong>
        </p>
        <p>
          Ngày nhận phòng:{' '}
          <strong>{moment(booking.checkInDate).format('DD/MM/YYYY')}</strong>
        </p>
        <p>
          Ngày trả phòng:{' '}
          <strong>{moment(booking.checkOutDate).format('DD/MM/YYYY')}</strong>
        </p>
        <p>
          Số ngày đặt phòng: <strong>{numberOfDays}</strong>
        </p>

        <div>
          <h5 className='hotel-color'>Số lượng khách</h5>
          <strong>Người lớn : {booking.numOfAdults}</strong>
          <strong>
            <p>Trẻ em : {booking.numOfChildren}</p>
          </strong>
        </div>

        {payment > 0 ? (
          <>
            <p>
              Tổng thanh toán:{' '}
              <strong>{payment.toLocaleString('vi-VN')} VND</strong>
            </p>

            {isFormValid ? (
              <Button variant='success' onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className='spinner-border spinner-border-sm mr-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                    Đang chuyển hướng đến thanh toán...
                  </>
                ) : (
                  'Xác nhận đặt phòng và tiếp tục thanh toán'
                )}
              </Button>
            ) : (
              <div className='d-flex justify-content-center align-items-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Đang tải...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className='text-danger'>
            Ngày trả phòng phải sau ngày nhận phòng.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
