import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className='container mt-5'>
      <div className='card shadow-lg' style={{ borderRadius: '10px' }}>
        <div className='card-body'>
          <h2 className='card-title text-center' style={{ fontWeight: 'bold' }}>
            Chào mừng đến với trang quản trị
          </h2>
          <hr />
          <div className='d-flex flex-column align-items-center'>
            <Link
              className='btn btn-primary mb-2 w-50'
              to={'/existing-rooms'}
              style={{ fontSize: '1.2rem', borderRadius: '5px' }}
            >
              Quản lý phòng khách sạn
            </Link>
            <Link
              className='btn btn-secondary w-50'
              to={'/existing-bookings'}
              style={{ fontSize: '1.2rem', borderRadius: '5px' }}
            >
              Quản lý đặt phòng
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
