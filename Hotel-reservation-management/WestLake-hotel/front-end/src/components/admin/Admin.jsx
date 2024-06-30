import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Chào mừng đến với trang quản trị</h2>
      <hr />
      <Link className='mb-2' to={'/existing-rooms'}>
        Quản lý phòng khách sạn
      </Link>{' '}
      <br />
      <Link to={'/existing-bookings'}>Quản lý đặt phòng</Link>
    </section>
  );
};

export default Admin;
