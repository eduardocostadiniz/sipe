import styled from "styled-components";


const ProductContainer = styled.div`
`;

const ProductTableActions = styled.div`
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

  .edit-action {
    background-color: ${(props => props.theme.primary)};
    color: white;
  }

`;

const ProductData = styled.div`
  background-color: white;

  & .product-image {
    width: 32px;
    height: 32px;
    border-radius: 1px;
    margin: 1px 2px;
  }
`;

const ProductForm = styled.div`
background-color: white;
padding: 15px;

& h3 {
  text-align: center;
}

& div#product-form {
  display: flex;

  & form {
    margin: auto;
    padding: 5px 10px;
    width: 320px;

    & input[type="email"], & input[type="text"], & input[type="number"], & input[type="url"] {
      height: 30px;
      border: 2px solid ${props => props.theme.primary};
      border-radius: 5px;
      padding: 2px 5px 2px 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    & textarea {
      border: 2px solid ${props => props.theme.primary};
      border-radius: 5px;
      padding: 2px 5px 2px 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    & div.group {
      display: grid;
      width: 100%;
      margin-bottom: 15px;

      & label:first-child {
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }

      & div.radio-group {
        display: flex;
        margin-top: 2px;
        margin-bottom: 2px;

        & div:last-child {
          margin-left: 20px;
        }

        & label {
          font-size: 14px;
        }
      }
    }

    & div.actions {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;

      & button {
        width: 150px;
        height: 35px;
        background-color: ${props => props.theme.primary};
        color: #FFF;
        text-align: center;
        border: 1px solid ${props => props.theme.primary};
        border-radius: 5px;
      }

      & button:hover {
        opacity: 0.8;
        cursor: pointer;
      }

    }
  }
}

`;

export {
  ProductContainer, ProductTableActions, ProductData, ProductForm
};