import React from "react";

import { ChipContainer } from './styles';

function StatusChip({ chipLabel, status }) {

  return (
    <ChipContainer status={status}>{chipLabel}</ChipContainer>
  )
}

export { StatusChip };
