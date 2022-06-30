import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import LoadingContext from "../../contexts/loadingContext";
import { StatusChip } from "../../components/Chip";
import { TableBody, TableHeader, TableWrapper } from "../../components/Table";
import orderService from "../../services/orderService";
import { OrderData, OrderContainer, OrderTableActions } from "./styles";

function Orders() {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [orders, setOrders] = useState(undefined);

  const ORDERS_TABLE_HEADERS = [
    'ID', 'CNPJ', 'Nome', 'Valor', 'Status', ''
  ];

  useEffect(() => {
    getOrders()

    return () => {
      setOrders([])
    }
  }, [])


  async function getOrders() {
    try {
      setIsLoading(true);
      const { data } = await orderService.getOrders();

      setOrders(data.orders)

    } finally {
      setIsLoading(false)
    }
  }

  function handleAdminOrderAction() {
    if (user && user.profile === 'ADMIN') {
      return (
        <OrderTableActions>
          <button onClick={() => navigate('/orders/new')}>Novo Pedido</button>
        </OrderTableActions>
      )
    }
    return <></>
  }

  function handleAmount(amount) {
    return `R$ ${Number(amount).toFixed(2).replace('.', ',')}`;
  }

  return (
    <OrderContainer>
      {handleAdminOrderAction()}
      <OrderData>
        <TableWrapper cardLabel='Pedidos'>
          <TableHeader headers={ORDERS_TABLE_HEADERS} />
          <TableBody>
            {
              orders && orders.map(el => (
                <tr key={String(el.id)}>
                  <td>{el.id}</td>
                  <td>{el.cnpj}</td>
                  <td>{el.name}</td>
                  <td>{handleAmount(el.amount)}</td>
                  <td>
                    <StatusChip chipLabel={el.status} />
                  </td>
                  <td>
                    <button className='edit-action' onClick={() => navigate(`/orders/${el.id}`)}>Editar</button>
                  </td>
                </tr>
              ))
            }
          </TableBody>
        </TableWrapper >
      </OrderData>
    </OrderContainer >
  )
}

export { Orders };
