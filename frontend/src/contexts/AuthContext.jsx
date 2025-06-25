'use client'

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Modal de logout
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userauth/login`,
        inputs,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      Cookies.set('userId', JSON.stringify(res.data)); // Armazena o token no cookie
      setCurrentUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('❌ Erro no login:', error);
      return null;
    }
  };

  const fetchUserId = async () => {
    const userIdCookie = Cookies.get('userId');
    if (!userIdCookie) return;

    try {
      const userId = JSON.parse(userIdCookie);
      const decodedToken = jwtDecode(userId.token);

      if (decodedToken?.userid) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userId`,
          { userid: decodedToken.userid },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.error('❌ Erro ao buscar userId:', err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserId();
    }
  }, [currentUser]);

  useEffect(() => {
    const restoreSession = async () => {
      const userIdCookie = Cookies.get('userId');
      if (userIdCookie) {
        try {
          const userId = JSON.parse(userIdCookie);
          const decodedToken = jwtDecode(userId.token);

          if (decodedToken?.userid) {
            setCurrentUser(userId);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('❌ Erro ao restaurar sessão:', error);
        }
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        isModalOpen,
        setIsModalOpen,
        toggleModal,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
