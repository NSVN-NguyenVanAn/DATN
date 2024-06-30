import React, { useState, useEffect } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeAdd = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState(['']);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState('');

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== '') {
      const updatedRoomTypes = [...roomTypes, newRoomType];
      setRoomTypes(updatedRoomTypes);
      setNewRoomType('');
      setShowNewRoomTypeInput(false);

      // Cập nhật newRoom với loại phòng mới
      handleRoomInputChange({
        target: { name: 'roomType', value: newRoomType },
      });
    }
  };

  return (
    <>
      <div>
        <select
          required
          className='form-select'
          name='roomType'
          onChange={(e) => {
            if (e.target.value === 'Add New') {
              setShowNewRoomTypeInput(true);
            } else {
              setShowNewRoomTypeInput(false);
              handleRoomInputChange(e);
            }
          }}
          value={newRoom.roomType || ''} // Ensure default value is not empty or undefined
        >
          <option value=''>Chọn một loại phòng</option>
          <option value='Add New'>Thêm loại phòng mới</option>
          {roomTypes
            .filter((type) => type)
            .map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
        </select>
        {showNewRoomTypeInput && (
          <div className='mt-2'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Nhập loại phòng mới'
                value={newRoomType}
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className='btn btn-hotel'
                type='button'
                onClick={handleAddNewRoomType}
              >
                Thêm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomTypeAdd;
