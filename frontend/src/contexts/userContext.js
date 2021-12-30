import React, { useContext, useEffect, useState } from "react";
import http from "../services/http";
import userService from "../services/userService";
import CustomThemeContext from "./customThemeContext";

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { defineUserTheme } = useContext(CustomThemeContext);

  useEffect(() => {
    async function getUserLogged() {
      const userTokenLogged = window.localStorage.getItem('userToken');

      if (userTokenLogged) {
        console.log('Carregando dados do usuário');
        http.defaults.headers.Authorization = `Bearer ${userTokenLogged}`;
        const result = await userService.getUserInfo();
        const { user: userLoaded } = result.data;

        setUser(userLoaded);
        defineUserTheme(userLoaded.theme);
      }
    }
    getUserLogged();

  }, []);

  async function loginUser(email, password) {
    console.log(`Logando usuário ${email}`);
    try {

      const userInfo = await userService.authUser(email, password);

      const { user, token } = userInfo.data;

      window.localStorage.setItem('userToken', token);

      http.defaults.headers.Authorization = `Bearer ${token}`

      setUser(user);
      defineUserTheme(user.theme);

    } catch (error) {
      console.error('Impossible to log in!', error);
    }
  }

  function logoutUser() {
    window.localStorage.removeItem('userToken');
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )

}

export default UserContext;