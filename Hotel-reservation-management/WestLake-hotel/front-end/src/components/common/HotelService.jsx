import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Header from './Header';
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from 'react-icons/fa';

const HotelService = () => {
  return (
    <>
      <div className='mb-2'>
        <Row className='mt-4'>
          <h4 className='text-center'>
            Dịch vụ tại <span className='hotel-color'> WestLake </span>Hotel
          </h4>
          <span className='text-center gap-2 '>
            <FaClock className='ml-5' /> Quầy lễ tân 24/7
          </span>
        </Row>
        <hr />

        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='hotel-color'>
                  <FaWifi /> WiFi
                </Card.Title>
                <Card.Text>Luôn kết nối với internet tốc độ cao.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='hotel-color'>
                  <FaUtensils /> Bữa sáng
                </Card.Title>
                <Card.Text>Buffet bữa sáng đặc biệt thơm ngon.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='hotel-color'>
                  <FaTshirt /> Giặt ủi
                </Card.Title>
                <Card.Text>Hãy để quần áo luôn sạch và thơm ngát .</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='hotel-color'>
                  <FaCocktail />
                  Quầy Mini-bar
                </Card.Title>
                <Card.Text>
                  Đồ uống và đồ ăn nhẹ ngay tại minibar trong phòng.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='hotel-color'>
                  <FaParking /> Gửi xe
                </Card.Title>
                <Card.Text>Bãi đỗ xe miễn phí rộng rãi</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='hotel-color'>
                  <FaSnowflake /> Điều hoà
                </Card.Title>
                <Card.Text>Luôn luôn mát và thoải mái</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <hr />
    </>
  );
};

export default HotelService;
