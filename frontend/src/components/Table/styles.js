import styled from "styled-components";

const TableCard = styled.div`

  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px #D5D2D2;
  padding: 10px 0px;
  overflow-x: scroll;

  & h3 {
    margin-left: 20px;
    margin-bottom: 20px;
    color: ${props => props.theme.text};
  }

  & table {
    width: 100%;
    border-collapse: collapse;

    & thead {
      background-color: #EFEFEF;
      color: var(--text-gray);
      margin-top: 5px;
      margin-bottom: 5px;
      text-align: left;
    }

    th, td {
      padding: 1rem;
      font-size: .9rem;
    }
    
    tbody tr:nth-child(even) {
      background-color: #F9FAFB;
    }

  }

`;

export { TableCard }