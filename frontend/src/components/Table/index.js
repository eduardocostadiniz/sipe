import React from "react";
import { TableCard } from "./styles";

function TableWrapper({ cardLabel, children }) {
  return (
    <TableCard>
      <h3>{cardLabel}</h3>
      <table>
        {children}
      </table>
    </TableCard>
  )
}

function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers && headers.map(el => <th key={el}>{el}</th>)}
      </tr>
    </thead>
  );
}

function TableBody({ children }) {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

export { TableWrapper, TableHeader, TableBody };
