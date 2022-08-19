// import { useKeycloak } from "@react-keycloak/web";
import React, { useContext, useEffect, useState } from "react";
import http from "../services/http";
import userService from "../services/userService";
import CustomThemeContext from "./customThemeContext";

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { defineUserTheme } = useContext(CustomThemeContext);

  async function loginUser(email, token) {
    console.log(`Logando usuário ${email}`);

    try {
      http.defaults.headers.Authorization = `Bearer ${token}`
      const result = await userService.getUserInfo();

      const { email, name, profile, avatar, theme } = result.data;
      const avatarPath = `${process.env.SIPE_BACKEND_URL}/${avatar}`

      setUser({ email, name, profile, avatar: avatarPath });
      defineUserTheme(theme);
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