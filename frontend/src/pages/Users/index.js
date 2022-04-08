import React, {useEffect, useState} from "react";
import { StatusChip } from "../../components/Chip";
import { TableBody, TableHeader, TableWrapper } from "../../components/Table";
import userService from "../../services/userService";
import { UsersContainer } from "./styles";

function Users() {

  const [users, setUsers] = useState(undefined);

  const USERS_TABLE_HEADERS = [
    'Nome', 'E-mail', 'Perfil', 'Status', 'Criado em'
  ];

  useEffect(() => {
    getUsers()
  }, [])


  async function getUsers() {
    const {data} = await userService.getUsers();

    setUsers(data.users)
  }

  return (
    <UsersContainer>
      <TableWrapper cardLabel='Usuários'>
        <TableHeader headers={USERS_TABLE_HEADERS} />
        <TableBody>
          {
            users && users.map(el => (
              <tr key={el.email}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.profile}</td>
                <td>
                  {
                    el.is_active
                      ? <StatusChip chipLabel='ATIVO' status='success' />
                      : <StatusChip chipLabel='INATIVO' status='error' />
                  }
                </td>
                <td>{new Date(el.created_at).toLocaleString()}</td>
              </tr>
            ))
          }
        </TableBody>
      </TableWrapper >
    </UsersContainer >
  )
}

export { Users };
