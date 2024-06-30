import React from 'react';
import { Container } from 'react-bootstrap';

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
          <h1>
            Trải nghiệm tuyệt vời nhất tại{' '}
            <span className='hotel-color'>WestLake Hotel</span>
          </h1>
          <h3>Nơi sự hài lòng của khách hàng là triết lý</h3>
        </div>
      </Container>
    </div>
  );
};

export default Parallax;
