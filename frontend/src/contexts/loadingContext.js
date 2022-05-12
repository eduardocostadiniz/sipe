// import { useKeycloak } from "@react-keycloak/web";
import React, { useState } from "react";
import { Loading } from "../components/Loading";

const LoadingContext = React.createContext({});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <Loading isLoading={isLoading}>
        {children}
      </Loading>
    </LoadingContext.Provider>
  )

}

export default LoadingContext;