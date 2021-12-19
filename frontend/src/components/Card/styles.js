import styled from "styled-components";


const StyledCardContainer = styled.div`

  display: flex;
  flex-flow: row wrap;
  justify-content: center;

`;

const StyledCard = styled.div`
  
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px #D5D2D2;
  width: 250px;
  height: 80px;
  padding: 30px;
  margin: 5px;
  display: flex;
  align-items: center;

  & span:first-child {
    font-size: 32px;
    margin-right: 20px;
    color: ${props => props.theme.primary};
  }

  & .card-info {
    display: flex;
    flex-direction: column;
  }

  & .card-info label {
    font-size: 14px;
  }

  & .card-info span {
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.primary};
  }

  @media only screen and (max-width: 920px) {
    .card-single {
      width: 70%;
    }
  }

`;

export { StyledCardContainer, StyledCard };
