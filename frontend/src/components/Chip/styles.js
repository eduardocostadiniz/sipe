
import styled, { css } from "styled-components";

const ChipBase = styled.label`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
`;

const ChipContainer = styled(ChipBase)`
  ${(props) => {
    switch (props.status) {
      case "success":
        return css`
            background-color: #DEF7EC;
            color: #004C00;
          `;
      case "warning":
        return css`
            background-color: #EFF67B;
            color: #909715;
          `;
      case "error":
        return css`
            background-color: #F7DEDE;
            color: #801818;
          `;
      default:
        return css`
            background-color: #333;
            color: white
          `;
    }
  }}

`;

export { ChipContainer };