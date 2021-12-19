import styled from "styled-components";


const MainContainer = styled.main`
  margin-left: 240px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr;

  @media only screen and (max-width: 680px) {
    .main-container {
      margin-left: 10px;
    }
  }

`;

const ContentContainer = styled.div`

  grid-column: 1/2;
  grid-row: 2/3;
  padding: 20px;

  @media only screen and (max-width: 500px) {
    .content-container {
      display: block;
      overflow-x: auto;
      z-index: 90;
    }
  }

`;

export { MainContainer, ContentContainer };
