import styled from "styled-components";


const LoginContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: teal;

  & div {
    width: 300px;
    height: 260px;
    padding: 20px;
    background-color: #EAEDED;
    border: none;
    border-radius: 10px;

    & h4 {
      text-align: center;
    }

    & input {
      width: calc(100% - 5px);
      height: 40px;
      color: teal;
      border: none;
      border-radius: 5px;
      font-weight: 700;
      margin-bottom: 20px;
      padding-left: 5px;

      &:focus, &:focus-visible {
        outline: 1px solid teal;
      }
    }

    & button {
      width: 100%;
      height: 40px;
      background-color: teal;
      color: white;
      border: none;
      border-radius: 5px;
      text-align: center;

      &:hover {
        opacity: 0.80;
      }
    }
  }
`;

export { LoginContainer };
