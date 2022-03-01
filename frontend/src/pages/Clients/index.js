import React from "react";
import { StatusChip } from "../../components/Chip";
import { TableBody, TableHeader, TableWrapper } from "../../components/Table";
import { ClientsContainer } from "./styles";

function Clients() {
  const CLIENTS_TABLE_HEADERS = [
    'Nome', 'CNPJ', 'E-mail', 'Telefone', 'Status'
  ];

  const MOCK_TABLE_BODY = [
    { name: 'Empresa', cnpj: '12345678000125', email: 'client@sipe.com', phone: '3432465377', active: true },
    { name: 'Empresa', cnpj: '12345678000126', email: 'client@sipe.com', phone: '3432465377', active: false },
    { name: 'Empresa', cnpj: '12345678000127', email: 'client@sipe.com', phone: '3432465377', active: true },
    { name: 'Empresa', cnpj: '12345678000128', email: 'client@sipe.com', phone: '3432465377', active: false },
    { name: 'Empresa', cnpj: '12345678000129', email: 'client@sipe.com', phone: '3432465377', active: true }
  ];

  return (
    <ClientsContainer>
      <TableWrapper cardLabel='Clientes'>
        <TableHeader headers={CLIENTS_TABLE_HEADERS} />
        <TableBody>
          {
            MOCK_TABLE_BODY && MOCK_TABLE_BODY.map(el => (
              <tr key={el.cnpj}>
                <td>{el.name}</td>
                <td>{el.cnpj}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
                <td>
                  {
                    el.active
                      ? <StatusChip chipLabel='ATIVO' status='success' />
                      : <StatusChip chipLabel='INATIVO' status='error' />
                  }
                </td>
              </tr>
            ))
          }
        </TableBody>
      </TableWrapper >
    </ClientsContainer >
  )
}

export { Clients };
