'use client'
import { createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // usado no BtnSignOut
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const login = async (inputs) => {
    try {
      const res = await axios.post('https://pos-backend-six.vercel.app/api/auth/login', inputs);
      Cookies.set('loginResponse', JSON.stringify(res.data));
      setCurrentUser(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     const loginResponse = Cookies.get('loginResponse') ? JSON.parse(Cookies.get('loginResponse')) : null;

  //     if (loginResponse && loginResponse.token) {
  //       const decodedToken = jwtDecode(loginResponse.token);
  //       const userid = decodedToken.userid;
  //       try {
  //         const res = await axios.post('https://pos-backend-six.vercel.app/api/auth/userId', { userid });
  //         console.log(res.data);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   };

  //   fetchUserId();
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, isModalOpen, setIsModalOpen, toggleModal }}>
      {children}
    </AuthContext.Provider>
  );
};