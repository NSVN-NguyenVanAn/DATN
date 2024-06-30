import React, { useState } from 'react';
import { loginUser } from '../utils/ApiFunctions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || '/';

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage(
        'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.'
      );
    }
    setTimeout(() => {
      setErrorMessage('');
    }, 4000);
  };

  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <label htmlFor='email' className='col-sm-2 col-form-label'>
            Email
          </label>
          <div>
            <input
              id='email'
              name='email'
              type='email'
              className='form-control'
              value={login.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='password' className='col-sm-2 col-form-label'>
            Mật khẩu
          </label>
          <div>
            <input
              id='password'
              name='password'
              type='password'
              className='form-control'
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='mb-3'>
          <button
            type='submit'
            className='btn btn-hotel'
            style={{ marginRight: '10px' }}
          >
            Đăng nhập
          </button>
          <span style={{ marginLeft: '10px' }}>
            Chưa có tài khoản ?<Link to={'/register'}> Đăng ký</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
