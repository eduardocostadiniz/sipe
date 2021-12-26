import React, { useContext, useState } from "react";
import userService from "../services/userService";
import CustomThemeContext from "./customThemeContext";

const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { defineUserTheme } = useContext(CustomThemeContext);

  async function loginUser(email, password) {
    console.log(`Logando usuário ${email}`);
    try {
      const userInfo = await userService.authUser(email, password);

      const { user, token } = userInfo.data;

      window.localStorage.setItem('userToken', token);

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
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )

}

export default UserContext;