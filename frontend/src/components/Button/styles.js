import styled from "styled-components";


function selectColor(props) {
  if (!props.primary && !props.cancel) {
    return `
      background-color: #E5E4E2;
      color: #333;
    `
  } else if (props.primary) {
    return `
      background-color: ${props.theme.primary};
      color: white;
    `
  } else if (props.cancel) {
    return `
      background-color: #8B0000;
      color: white;
    `
  }
}

const SimpleStyledButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: #E5E4E2;
  color: #333;

  &:hover {
    opacity: 0.8;
  }
`;

const PrimaryStyledButton = styled(SimpleStyledButton)`
  background-color: ${(props => props.theme.primary)};
  color: white;
`;

const IconLabeledStyledButton = styled(SimpleStyledButton)`
  ${(props => selectColor(props))}
  border-radius: 5px;
  padding: 7px 10px;

  & span {
    margin-right: 5px;
    font-weight: bold;
  }
`;

const IconStyledButton = styled(SimpleStyledButton)`
  ${(props => selectColor(props))}
  border-radius: 5px;
  padding: 7px 10px;
`;

export { SimpleStyledButton, PrimaryStyledButton, IconLabeledStyledButton, IconStyledButton };
