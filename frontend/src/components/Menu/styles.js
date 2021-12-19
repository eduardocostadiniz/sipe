import styled from "styled-components";


const InputContainer = styled.input`

  display: none;

  &:checked ~ .menu-container .brand-info img,
  &:checked ~ .menu-container .menu-options ul li label:last-child {
    display: none;
  }

  &:checked ~ .menu-container {
    width: 60px;
  }

  &:checked ~ .main-container {
    margin-left: 60px;
    transition: width 500ms;
  }

`;

const MenuContainer = styled.div`

  background-color: ${props => props.theme.primary};
  color: white;
  position: fixed;
  width: 240px;
  height: calc(100% + 70px); /*No celular a barra do navegador some, causando uma visão de falha*/
  left: 0;
  top: 0;
  z-index: 100;
  transition: width 500ms;

`;

const BrandInfo = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 5px 15px;

  & img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  & label {
    cursor: pointer;
    font-size: 24px;
  }
`;

const MenuOptions = styled.div`

  & ul {
    list-style-type: none;
    padding: 2px 10px;
    margin-top: 10px;
  }

  & li {
    display: grid;
    grid-template-columns: 40px calc(100% - 40px);
    grid-template-rows: 30px;
    column-gap: 10px;
    align-items: center;
    margin: 10px 0px;
    font-size: 16px;
  }

  & li:hover {
    background-color: whitesmoke;
    color: ${props => props.theme.primary};
    cursor: pointer;
    border-radius: 10px;
  }

  & li span {
    font-size: 18px;
    grid-column: 1/2;
    justify-self: center;
  }

  & li label {
    font-size: 18px;
    margin-right: 17px;
    grid-column: 2/3;
  }
`;

export { InputContainer, MenuContainer, BrandInfo, MenuOptions };
