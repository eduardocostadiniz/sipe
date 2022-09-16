import styled from "styled-components";


const OrderContainer = styled.div`
`;

const OrderTableActions = styled.div`
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

const OrderData = styled.div`
  background-color: white;

  & .order-image {
    width: 32px;
    height: 32px;
    border-radius: 1px;
    margin: 1px 2px;
  }
`;

const OrderDetailContainer = styled.div`
  background-color: white;
  padding: 15px;

  & div.order-detail-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 14px;

    & div {
      padding-top: 5px;
      padding-bottom: 5px;

      & span {
        font-weight: bolder;
        color: ${props => props.theme.primary}
      }

      & label.order-detail-item-title {
        font-weight: 700;
        margin-left: 5px;
        color: ${props => props.theme.primary}
      }

      & label.order-detail-item-value {
        color:#333;
        margin-left: 5px;
      }
    }
  }
`;

const OrderDetailProducts = styled.div`
  background-color: #EEEEEE;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
`;

const OrderDetailProductCard = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 10px 5px;
  margin: 10px 0px;
  color: #333;

  & div {
    display: flex;
    justify-content: space-between;

    & div label {
      color: ${props => props.theme.primary};
      margin-right: 5px;
    }
  }
`;

export {
  OrderContainer, OrderTableActions, OrderData, OrderDetailContainer, OrderDetailProducts, OrderDetailProductCard
};