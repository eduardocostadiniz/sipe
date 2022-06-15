import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import LoadingContext from "../../contexts/loadingContext";
import { StatusChip } from "../../components/Chip";
import { TableBody, TableHeader, TableWrapper } from "../../components/Table";
import clientService from "../../services/clientService";
import { ClientData, ClientContainer, ClientTableActions } from "./styles";

function Clients() {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [clients, setClients] = useState(undefined);

  const CLIENTS_TABLE_HEADERS = [
    'Nome', 'CNPJ', 'E-mail', 'Telefone', 'Status', ''
  ];

  useEffect(() => {
    getClients()

    return () => {
      setClients([])
    }
  }, [])


  async function getClients() {
    try {
      setIsLoading(true);
      const { data } = await clientService.getClients();

      setClients(data.clients)

    } finally {
      setIsLoading(false)
    }
  }

  function handleAdminClientAction() {
    if (user && user.profile === 'ADMIN') {
      return (
        <ClientTableActions>
          <button onClick={() => navigate('/clients/new')}>Novo Cliente</button>
        </ClientTableActions>
      )
    }
    return <></>
  }

  return (
    <ClientContainer>
      {handleAdminClientAction()}
      <ClientData>
        <TableWrapper cardLabel='Clientes'>
          <TableHeader headers={CLIENTS_TABLE_HEADERS} />
          <TableBody>
            {
              clients && clients.map(el => (
                <tr key={el.cnpj}>
                  <td>{el.name}</td>
                  <td>{el.cnpj}</td>
                  <td>{el.email}</td>
                  <td>{el.phone}</td>
                  <td>
                    {
                      el.is_active
                        ? <StatusChip chipLabel='ATIVO' status='success' />
                        : <StatusChip chipLabel='INATIVO' status='error' />
                    }
                  </td>
                  <td>
                    <button className='edit-action' onClick={() => navigate(`/clients/${el.cnpj}`)}>Editar</button>
                  </td>
                </tr>
              ))
            }
          </TableBody>
        </TableWrapper >
      </ClientData>
    </ClientContainer >
  )
}

export { Clients };
