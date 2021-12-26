import React, { useContext } from "react";

import UserContext from "../../contexts/userContext";
import { LoginContainer } from "./styles";

function Login() {
  const { loginUser } = useContext(UserContext);

  async function handleLoginUser() {
    // TODO: trocar para estado
    await loginUser('email@teste.com', '123');
  }

  return (
    <LoginContainer>
      <div>
        <h4>Faça login para acessar</h4>
        <input type='text' placeholder='E-mail' />
        <input type='password' placeholder='Senha' />
        <button onClick={handleLoginUser}>Login</button>
      </div>
    </LoginContainer>
  )
}

export { Login };
