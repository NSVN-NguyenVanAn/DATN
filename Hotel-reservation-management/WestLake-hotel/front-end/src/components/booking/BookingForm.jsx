import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import BookingSummary from './BookingSummary';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);

  const currentUser = localStorage.getItem('userId');
  const { roomId } = useParams();

  const [booking, setBooking] = useState({
    roomId: roomId,
    guestFullName: '',
    guestEmail: currentUser,
    numOfAdults: '',
    numOfChildren: '',
    checkInDate: '',
    checkOutDate: '',
    price: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage('');
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage('Ngày trả phòng phải sau ngày nhận phòng.');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    booking.price = calculatePayment();
    try {
      const paymentLink = await bookRoom(booking);
      setIsSubmitted(true);
      window.location.href = paymentLink;
    } catch (error) {
      const errorMessage = error.message;
      navigate('/booking-success', { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card card-body mt-5'>
              <h4 className='card-title'>Đặt phòng</h4>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor='guestFullName' className='hotel-color'>
                    Họ tên
                  </Form.Label>
                  <FormControl
                    required
                    type='text'
                    id='guestFullName'
                    name='guestFullName'
                    value={booking.guestFullName}
                    placeholder='Nhập họ tên'
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Hãy nhập họ tên.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor='guestEmail' className='hotel-color'>
                    Email
                  </Form.Label>
                  <FormControl
                    required
                    type='email'
                    id='guestEmail'
                    name='guestEmail'
                    value={booking.guestEmail}
                    placeholder='Enter your email'
                    onChange={handleInputChange}
                    disabled
                  />
                  <Form.Control.Feedback type='invalid'>
                    Hãy nhập địa chỉ email.
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: '2px' }}>
                  <legend>Thời gian đặt phòng</legend>
                  <div className='row'>
                    <div className='col-6'>
                      <Form.Label htmlFor='checkInDate' className='hotel-color'>
                        Ngày nhận phòng
                      </Form.Label>
                      <FormControl
                        required
                        type='date'
                        id='checkInDate'
                        name='checkInDate'
                        value={booking.checkInDate}
                        placeholder='check-in-date'
                        min={moment().format('YYYY-MM-DD')}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Hãy nhập ngày nhận phòng.
                      </Form.Control.Feedback>
                    </div>

                    <div className='col-6'>
                      <Form.Label
                        htmlFor='checkOutDate'
                        className='hotel-color'
                      >
                        Ngày trả phòng
                      </Form.Label>
                      <FormControl
                        required
                        type='date'
                        id='checkOutDate'
                        name='checkOutDate'
                        value={booking.checkOutDate}
                        placeholder='check-out-date'
                        min={moment().format('YYYY-MM-DD')}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Hãy nhập ngày trả phòng.
                      </Form.Control.Feedback>
                    </div>
                    {errorMessage && (
                      <p className='error-message text-danger'>
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset style={{ border: '2px' }}>
                  <legend>Số lượng khách</legend>
                  <div className='row'>
                    <div className='col-6'>
                      <Form.Label htmlFor='numOfAdults' className='hotel-color'>
                        Người lớn
                      </Form.Label>
                      <FormControl
                        required
                        type='number'
                        id='numOfAdults'
                        name='numOfAdults'
                        value={booking.numOfAdults}
                        min={1}
                        placeholder='0'
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Hãy nhập ít nhất một người lớn
                      </Form.Control.Feedback>
                    </div>
                    <div className='col-6'>
                      <Form.Label
                        htmlFor='numOfChildren'
                        className='hotel-color'
                      >
                        Trẻ em
                      </Form.Label>
                      <FormControl
                        required
                        type='number'
                        id='numOfChildren'
                        name='numOfChildren'
                        value={booking.numOfChildren}
                        placeholder='0'
                        min={0}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Chọn 0 nếu không có trẻ em
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </fieldset>

                <div className='fom-group mt-2 mb-2'>
                  <button type='submit' className='btn btn-hotel'>
                    Tiếp tục
                  </button>
                </div>
              </Form>
            </div>
          </div>

          <div className='col-md-4'>
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                onConfirm={handleFormSubmit}
                isFormValid={validated}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingForm;
