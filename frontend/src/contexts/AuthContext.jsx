'use client'
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useSession, signIn } from "next-auth/react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { data: session } = useSession();

  // usado no BtnSignOut
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userauth/login`,
        inputs,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      Cookies.set("userId", JSON.stringify(res.data));
      setCurrentUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = Cookies.get('userId')
        ? JSON.parse(Cookies.get('userId'))
        : null;

      if (userId && userId.token) {
        const decodedToken = jwtDecode(userId.token);
        const userid = decodedToken.userid;
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userId`, { userid });
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (currentUser) {
      fetchUserId();
    }
  }, [currentUser]);

  useEffect(() => {
    if (session) {
      setCurrentUser(session.user);
      setIsAuthenticated(true);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, isModalOpen, setIsModalOpen, toggleModal, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};