import React, { useEffect, useState } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState({
    photo: '',
    roomType: '',
    roomNo: '',
    roomPrice: '',
    roomDes: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRoom = { ...room };
      if (room.photo instanceof File) {
        updatedRoom.photo = room.photo;
      } else {
        delete updatedRoom.photo;
      }

      const response = await updateRoom(roomId, updatedRoom);
      if (response.status === 200) {
        setSuccessMessage('Cập nhật phòng thành công!');
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage('');
      } else {
        setErrorMessage('Lỗi cập nhật phòng');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Lỗi cập nhật phòng');
    }
  };

  return (
    <div className='container mt-5 mb-5'>
      <h3 className='text-center mb-5 mt-5'>Chỉnh sửa thông tin phòng</h3>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          {successMessage && (
            <div className='alert alert-success' role='alert'>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='roomType' className='form-label hotel-color'>
                Loại phòng
              </label>
              <input
                required
                type='text'
                className='form-control'
                id='roomType'
                name='roomType'
                value={room.roomType}
                onChange={handleInputChange}
              />
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='roomNo' className='form-label hotel-color'>
                  Số phòng
                </label>
                <input
                  required
                  type='number'
                  className='form-control'
                  id='roomNo'
                  name='roomNo'
                  value={room.roomNo}
                  onChange={handleInputChange}
                  min='1' // Đảm bảo giá trị không nhỏ hơn 1
                />
              </div>

              <div className='col-md-6 mb-3'>
                <label htmlFor='roomPrice' className='form-label hotel-color'>
                  Giá phòng
                </label>
                <div className='input-group'>
                  <input
                    required
                    type='number'
                    className='form-control'
                    id='roomPrice'
                    name='roomPrice'
                    value={room.roomPrice}
                    onChange={handleInputChange}
                    min='0' // Đảm bảo giá trị không nhỏ hơn 0
                  />
                  <span className='input-group-text'>VNĐ</span>
                </div>
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='roomDes' className='form-label hotel-color'>
                Mô tả
              </label>
              <textarea
                className='form-control'
                id='roomDes'
                name='roomDes'
                value={room.roomDes}
                onChange={handleInputChange}
                rows='3'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='photo' className='form-label hotel-color'>
                Ảnh phòng
              </label>
              <input
                type='file'
                className='form-control'
                id='photo'
                name='photo'
                onChange={handleImageChange}
              />
              {imagePreview && room.photo instanceof File ? (
                <img
                  src={imagePreview}
                  alt='Room preview'
                  style={{ maxWidth: '400px', maxHeight: '400px' }}
                  className='mt-3'
                />
              ) : (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  alt='Preview room photo'
                  style={{ maxWidth: '400px', maxHeight: '400px' }}
                  className='mb-3'
                />
              )}
            </div>
            <div className='d-grid gap-2 d-md-flex mt-2'>
              <Link
                to={'/existing-rooms'}
                className='btn btn-outline-info ml-5'
              >
                Quay lại
              </Link>
              <button type='submit' className='btn btn-outline-warning'>
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
