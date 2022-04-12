import styled from "styled-components";

const UsersContainer = styled.div`
`;

const UserTableActions = styled.div`
  background-color: white;
  margin-bottom: 30px;
  padding: 15px;
  display: flex;
  justify-content: right;

  & button {
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    background-color: ${(props => props.theme.primary)};
    color: white;
  }

  &:hover {
    opacity: 0.8;
  }

`;

const UsersData = styled.div`
  background-color: white;
`;

const UserForm = styled.div`
  background-color: white;
  padding: 15px;

  & h3 {
    text-align: center;
  }

  & div#user-form {
    display: flex;

    & form {
      margin: auto;
      padding: auto;
    }

  }

`;

export {
  UsersContainer, UserTableActions, UsersData, UserForm
};