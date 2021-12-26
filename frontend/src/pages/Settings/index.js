import React, { useContext } from "react";

import UserContext from "../../contexts/userContext";

function Settings() {
  const { user } = useContext(UserContext);

  return (
    <h4>Configurações de {user && user.name}</h4>
  )
}

export { Settings };
