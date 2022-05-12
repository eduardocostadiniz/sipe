
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: absolute;
  background-color: whitesmoke;
  opacity: 0.85;
  z-index: 1000;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    color: ${props => props.theme.primary};
    font-weight: 700;
  }

`;

export { LoadingContainer };