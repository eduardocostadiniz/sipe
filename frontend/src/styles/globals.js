import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html, body {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  background-color: #EAEDED;
  color: ${props => props.theme.text};
  width: 100%;
  height: 100%;
  font-size: 14px;
}

.order-last-activity {
  margin-top: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px #D5D2D2;
  padding: 10px 0px;
  overflow-x: scroll;
}

.order-last-activity h3 {
  margin-left: 20px;
  margin-bottom: 20px;
  color: ${props => props.theme.text};
}

.order-last-activity table {
  width: 100%;
  border-collapse: collapse;
}

.order-last-activity table thead {
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

.order-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.order-status.order-success {
  background-color: #DEF7EC;
  color: #004C00;
}

.order-status.order-pending {
  background-color: #EFF67B;
  color: #909715;
}

.order-status.order-cancelled {
  background-color: #F7DEDE;
  color: #801818;
}

`;

export { GlobalStyle };
