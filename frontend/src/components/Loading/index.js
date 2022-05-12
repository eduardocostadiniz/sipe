import React from "react";

import { LoadingContainer } from './styles';

function Loading({ children, isLoading }) {

  function renderLoading() {
    return isLoading
      ? (
        <LoadingContainer>
          <span>Aguarde...</span>
        </LoadingContainer>
      )
      : <div />
  }

  return (
    <>
      {renderLoading()}
      <div>
        {children}
      </div>
    </>
  )
}

export { Loading };
