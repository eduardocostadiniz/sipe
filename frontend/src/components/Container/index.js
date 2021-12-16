import React from "react";
import { Menu } from "../Menu";

import { Header } from "../Header";

function MainContainer({ children }) {
  return (
    <main className="main-container">
      {children}
    </main>
  )
}

function ContentContainer({ children }) {
  return (
    <div className="content-container">
      {children}
    </div>
  )
}

function Container({ children }) {
  return (
    <>
      <Menu />
      <MainContainer>
        <Header />
        <ContentContainer>
          {children}
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export { Container };
