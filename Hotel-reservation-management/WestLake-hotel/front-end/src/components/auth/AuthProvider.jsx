import React, { createContext, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
  isRole: (role) => false, // Thêm phương thức kiểm tra vai trò
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwt_decode(token);
      return decodedUser;
    }
    return null;
  });

  const handleLogin = (token) => {
    const decodedUser = jwt_decode(token);
    localStorage.setItem('userId', decodedUser.sub);
    localStorage.setItem('userRole', decodedUser.roles.join(',')); // Lưu danh sách vai trò dưới dạng chuỗi
    localStorage.setItem('token', token);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Kiểm tra xem người dùng có vai trò nhất định không
  const isRole = (role) => user?.roles?.includes(role);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
