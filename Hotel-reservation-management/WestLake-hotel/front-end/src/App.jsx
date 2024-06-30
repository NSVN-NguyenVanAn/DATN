import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import ExistingRooms from './components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import AddRoom from './components/room/AddRoom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Checkout from './components/booking/Checkout';
import BookingSuccess from './components/booking/BookingSuccess';
import Bookings from './components/booking/Bookings';
import FindBooking from './components/booking/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import { AuthProvider } from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/edit-room/:roomId'
              element={
                <RequireAuth role='ROLE_ADMIN'>
                  <EditRoom />
                </RequireAuth>
              }
            />
            <Route
              path='/existing-rooms'
              element={
                <RequireAuth role='ROLE_ADMIN'>
                  <ExistingRooms />
                </RequireAuth>
              }
            />
            <Route
              path='/add-room'
              element={
                <RequireAuth role='ROLE_ADMIN'>
                  <AddRoom />
                </RequireAuth>
              }
            />
            <Route
              path='/book-room/:roomId'
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path='/browse-all-rooms' element={<RoomListing />} />

            <Route
              path='/admin'
              element={
                <RequireAuth role='ROLE_ADMIN'>
                  <Admin />
                </RequireAuth>
              }
            />
            <Route path='/booking-success' element={<BookingSuccess />} />
            <Route
              path='/existing-bookings'
              element={
                <RequireAuth role='ROLE_ADMIN'>
                  <Bookings />
                </RequireAuth>
              }
            />
            <Route
              path='/find-booking'
              element={
                <RequireAuth role='ROLE_ADMIN'>
                  <FindBooking />
                </RequireAuth>
              }
            />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/logout' element={<FindBooking />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
