import React from 'react';

const MainHeader = () => {
  return (
    <header className='header-banner'>
      <div className='overlay'></div>
      <div className='animated-texts overlay-content'>
        <h1>
          Chào mừng đến với <span className='hotel-color'> WestLake Hotel</span>
        </h1>
        <h4>Khám Phá Sự Thanh Bình Giữa Lòng Thủ Đô</h4>
      </div>
    </header>
  );
};

export default MainHeader;
