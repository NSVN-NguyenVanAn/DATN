import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../common/Header';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message; // Thông báo thành công
  const error = location.state?.error; // Thông báo lỗi

  // Hàm để quay lại trang trước
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='container'>
      <Header title='Booking Success' />
      <div className='mt-5'>
        {message ? (
          <div>
            <h3 className='text-success'>Đặt phòng thành công!</h3>
            <p className='text-success'>{message}</p>
          </div>
        ) : (
          <div>
            <h3 className='text-danger'>Lỗi: Không thể đặt phòng!</h3>
            <p className='text-danger'>{error}</p>
          </div>
        )}
        {/* Nút quay lại trang trước */}
        <div className='mt-4'>
          <button onClick={handleGoBack} className='btn hotel-color'>
            Quay lại trang trước
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
