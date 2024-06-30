import React, { useEffect, useState } from 'react';
import BookingForm from '../booking/BookingForm';
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getRoomById } from '../utils/ApiFunctions';
import RoomCarousel from '../common/RoomCarousel';

const Checkout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: '',
    roomType: '',
    roomPrice: '',
    roomDes: '',
  });

  const { roomId } = useParams();

  useEffect(() => {
    getRoomById(roomId)
      .then((response) => {
        setRoomInfo(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [roomId]);

  return (
    <div>
      <section className='container'>
        <div className='row'>
          <div className='col-md-4 mt-5 mb-5'>
            {isLoading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className='room-info'>
                <img
                  src={`data:image/png;base64,${roomInfo.photo}`}
                  alt='Room photo'
                  style={{ width: '100%', height: '200px' }}
                />
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th>Loại phòng:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Giá phòng/ngày:</th>
                      <td>{roomInfo.roomPrice} VND</td>
                    </tr>
                  </tbody>
                </table>
                <div className='room-description'>
                  <p className='mt-3'>{roomInfo.roomDes}</p>
                </div>
              </div>
            )}
          </div>
          <div className='col-md-8'>
            <BookingForm />
          </div>
        </div>
      </section>
      <div className='container'>
        <RoomCarousel />
      </div>
    </div>
  );
};

export default Checkout;
