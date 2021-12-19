import React from "react";
import { Menu } from "../Menu";

import { Header } from "../Header";

import { MainContainer, ContentContainer } from './styles';

function Container({ children }) {
  return (
    <>
      <Menu />
      <MainContainer className='main-container'>
        <Header />
        <ContentContainer className='content-container'>
          {children}
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export { Container };
