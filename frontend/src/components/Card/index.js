import React from "react";

import { StyledCardContainer, StyledCard } from './styles';

function Card({ iconName, children }) {
  return (
    <StyledCard className="card-single">
      <span className={iconName}></span>
      <div className="card-info">
        {children}
      </div>
    </StyledCard>
  )
}

function CardContainer({ children }) {
  return (
    <StyledCardContainer className="card-container">
      {children}
    </StyledCardContainer>
  )
}

export { CardContainer, Card };
