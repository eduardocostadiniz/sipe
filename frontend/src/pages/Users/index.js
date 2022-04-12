import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusChip } from "../../components/Chip";
import { TableBody, TableHeader, TableWrapper } from "../../components/Table";
import userService from "../../services/userService";
import { UsersContainer, UserTableActions, UsersData } from "./styles";

function Users() {
  let navigate = useNavigate();
  const [users, setUsers] = useState(undefined);

  const USERS_TABLE_HEADERS = [
    'Nome', 'E-mail', 'Status', 'Criado em'
  ];

  useEffect(() => {
    getUsers()
  }, [])


  async function getUsers() {
    const { data } = await userService.getUsers();

    setUsers(data.users)
  }

  function onNewClientClick() {
    navigate('/users/new')
  }

  return (
    <UsersContainer>
      <UserTableActions>
        <button onClick={onNewClientClick}>Novo Usuário</button>
      </UserTableActions>
      <UsersData>
        <TableWrapper cardLabel='Usuários'>
          <TableHeader headers={USERS_TABLE_HEADERS} />
          <TableBody>
            {
              users && users.map(el => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>
                    {
                      el.isActive
                        ? <StatusChip chipLabel='ATIVO' status='success' />
                        : <StatusChip chipLabel='INATIVO' status='error' />
                    }
                  </td>
                  <td>{new Date(el.createdAt).toLocaleString()}</td>
                </tr>
              ))
            }
          </TableBody>
        </TableWrapper >
      </UsersData>
    </UsersContainer >
  )
}

export { Users };
