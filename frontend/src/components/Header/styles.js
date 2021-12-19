import styled from "styled-components";

const StyledHeader = styled.header`

  grid-column: 1/2;
  grid-row: 1/2;
  background-color: white;
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
  box-shadow: 1px 1px 5px #D5D2D2;

`;

const UserActions = styled.div`

  font-size: 20px;
  padding-right: 10px;

  & span {
    margin-right: 10px;
  }

`;

const UserAvatar = styled.div`

  & img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
  }

`;

export { StyledHeader, UserActions, UserAvatar };
