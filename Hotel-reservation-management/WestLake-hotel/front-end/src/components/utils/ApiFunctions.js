import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:9192',
});

export const getHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found in localStorage');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function addRoom(photo, roomType, roomNo, roomPrice, roomDes) {
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('roomType', roomType);
  formData.append('roomNo', roomNo);
  formData.append('roomPrice', roomPrice);
  formData.append('roomDes', roomDes);

  try {
    const response = await api.post('/rooms/add/new-room', formData, {
      headers: getHeader(),
    });

    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Error
    console.error('Error adding room:', error);
    return false;
  }
}

/* Get all room  */
export async function getRoomTypes() {
  try {
    const response = await api.get('/rooms/room/types');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching room types');
  }
}
/* This function gets all rooms from the database */
export async function getAllRooms() {
  try {
    const result = await api.get('/rooms/all-rooms');
    return result.data;
  } catch (error) {
    throw new Error('Error fetching rooms');
  }
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`);
  }
}
/* This function update a room */
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append('roomType', roomData.roomType);
  formData.append('roomNo', roomData.roomNo);
  formData.append('roomPrice', roomData.roomPrice);
  formData.append('roomDes', roomData.roomDes);
  formData.append('photo', roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(),
  });
  return response;
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}

/* This function saves a new booking to the databse */
export async function bookRoom(booking) {
  try {
    const response = await api.post(`/bookings/room/booking`, booking);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Lỗi đặt phòng : ${error.message}`);
    }
  }
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
  try {
    const result = await api.get('/bookings/all-bookings', {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings : ${error.message}`);
  }
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Lỗi tìm thông tin đặt phòng : ${error.message}`);
    }
  }
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Lỗi huỷ đặt phòng :${error.message}`);
  }
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await api.get(
    `rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result;
}

/* This function register a new user */
export async function registerUser(registration) {
  try {
    const response = await api.post('/auth/register-user', registration);
    return response.data;
  } catch (error) {
    if (error.reeponse && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Lỗi đăng ký tài khoản : ${error.message}`);
    }
  }
}

/* This function login a registered user */
export async function loginUser(login) {
  try {
    const response = await api.post('/auth/login', login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This is the function to delete a user */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw new Error('Lỗi tải thông tin đặt phòng');
  }
}

export const checkRoomAvailability = async (
  roomId,
  checkInDate,
  checkOutDate
) => {
  try {
    const response = await api.post('/rooms/check-availability', null, {
      params: {
        roomId,
        checkInDate,
        checkOutDate,
      },
    });

    // Xử lý thông báo từ API
    if (response.status === 200) {
      return response.data === 'Phòng đang có sẵn.'; // Xác nhận phòng có sẵn
    } else {
      throw new Error(`Lỗi kiểm tra phòng: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Phòng không có sẵn trong khoảng thời gian này`);
  }
};
