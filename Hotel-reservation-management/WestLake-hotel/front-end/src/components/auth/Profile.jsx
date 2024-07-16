import React, { useEffect, useState } from 'react';
import {
  deleteUser,
  getBookingsByUserId,
  getUser,
} from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Profile = () => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: [{ id: '', name: '' }],
  });

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId, token]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId, token);
        setBookings(response);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userId, token]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa tài khoản của mình không? Hành động này không thể hoàn tác.'
    );
    if (confirmed) {
      await deleteUser(userId)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userRole');
          navigate('/');
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  return (
    <div className='container'>
      {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      {message && <p className='text-danger'>{message}</p>}
      {user ? (
        <div
          className='card p-5 mt-5'
          style={{ backgroundColor: 'whitesmoke' }}
        >
          <h4 className='card-title text-center'>Thông tin người dùng</h4>
          <div className='card-body'>
            <div className='col-md-10 mx-auto'>
              <div className='card mb-3 shadow'>
                <div className='row g-0'>
                  <div className='col-md-2'>
                    <div className='d-flex justify-content-center align-items-center mb-4'>
                      <img
                        src='https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg'
                        alt='Profile'
                        className='rounded-circle'
                        style={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>

                  <div className='col-md-10'>
                    <div className='card-body'>
                      <div className='form-group row'>
                        <label className='col-md-2 col-form-label fw-bold'>
                          ID:
                        </label>
                        <div className='col-md-10 col-form-label'>
                          <p className='card-text'>{user.id}</p>
                        </div>
                      </div>
                      <hr />

                      <div className='form-group row'>
                        <label className='col-md-2 col-form-label fw-bold'>
                          Họ:
                        </label>
                        <div className='col-md-10 col-form-label'>
                          <p className='card-text'>{user.firstName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className='form-group row'>
                        <label className='col-md-2 col-form-label fw-bold'>
                          Tên:
                        </label>
                        <div className='col-md-10 col-form-label'>
                          <p className='card-text'>{user.lastName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className='form-group row'>
                        <label className='col-md-2 col-form-label fw-bold'>
                          Email:
                        </label>
                        <div className='col-md-10 col-form-label'>
                          <p className='card-text'>{user.email}</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>

              <h4 className='card-title text-center'>Lịch sử đặt phòng</h4>

              {bookings.length > 0 ? (
                <table className='table table-bordered table-hover shadow'>
                  <thead>
                    <tr>
                      <th scope='col'>ID đặt phòng</th>
                      <th scope='col'>Loại phòng</th>
                      <th scope='col'>Số phòng</th>
                      <th scope='col'>Nhận phòng</th>
                      <th scope='col'>Trả phòng </th>
                      <th scope='col'>Thanh toán</th>
                      <th scope='col'>Mã xác nhận</th>
                      <th scope='col'>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>{booking.room.roomNo}</td>
                        <td>
                          {moment(booking.checkInDate)
                            .subtract(1, 'month')
                            .format('DD/MM/YYYY')}
                        </td>
                        <td>
                          {moment(booking.checkOutDate)
                            .subtract(1, 'month')
                            .format('DD/MM/YYYY')}
                        </td>
                        <td>
                          {booking.price
                            ? booking.price.toLocaleString('vi-VN')
                            : 'N/A'}{' '}
                          VND
                        </td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td className='text-success'>Đang tiến hành</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Bạn chưa đặt phòng lần nào</p>
              )}

              <div className='d-flex justify-content-center'>
                <div className='mx-2'>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={handleDeleteAccount}
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </div>
  );
};

export default Profile;
