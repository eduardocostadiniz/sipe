import React from "react";

import { SimpleStyledButton, PrimaryStyledButton, IconLabeledStyledButton, IconStyledButton } from './styles';

function SimpleButton({ label, ...props }) {
  return (
    <SimpleStyledButton {...props}>
      {label}
    </SimpleStyledButton>
  )
}

function PrimaryButton({ label, ...props }) {
  return (
    <PrimaryStyledButton {...props}>
      {label}
    </PrimaryStyledButton>
  )
}

function IconButton({ label, iconName='ti-pencil', ...props }) {
  if (label) {
    return (
      <IconLabeledStyledButton {...props}>
        <span className={iconName}></span>
        {label}
      </IconLabeledStyledButton>
    )
  }

  return (
    <IconStyledButton {...props}>
      <span className={iconName}></span>
    </IconStyledButton>
  )
}

export { SimpleButton, PrimaryButton, IconButton};
