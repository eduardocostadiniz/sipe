import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingContext from "../../contexts/loadingContext";
import orderService from "../../services/orderService";
import { OrderDetailContainer, OrderDetailProductCard, OrderDetailProducts } from "./styles";

function OrderDetailItem({ title, value, iconName }) {
  return (
    <div>
      <span className={iconName} />
      <label className='order-detail-item-title'>{title}:</label>
      <label className='order-detail-item-value'>{value}</label>
    </div>
  );
}

function OrderDetail() {
  const { setIsLoading } = useContext(LoadingContext);
  const [order, setOrder] = useState({})
  // const [description, setDescription] = useState('')
  // const [price, setPrice] = useState(0.00)
  // const [imgUrl, setImgUrl] = useState('')
  // const [enabled, setEnabled] = useState(true)
  let { id } = useParams();
  // let navigate = useNavigate();

  useEffect(() => {
    async function getOrderById() {
      try {
        setIsLoading(true)
        const { data } = await orderService.getOrderById(id);
        setOrder(data.order)

      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false)
      }
    }
    getOrderById()

    return () => {
      setOrder({})
    }
  }, [id]);

  function formatMoney(amount) {
    const value = Number(amount).toFixed(2);
    return `R$ ${value.replace('.', ',')}`;
  }

  function handleOrderProductItem(product) {
    if (!product) {
      return (<></>)
    }
    return (
      <>
        <label>{product.name}</label>
        <div>
          <div>
            <label>Quantidade:</label> {product.product_qty}
          </div>
          <div>
            <label>Preço:</label> {formatMoney(product.product_value)}
          </div>
          <div>
            <label>Total:</label> {formatMoney(product.product_qty * product.product_value)}
          </div>
        </div>
      </>
    )
  }

  return (
    <OrderDetailContainer>
      <div className='order-detail-item'>
        <OrderDetailItem title='Pedido' value={`${order.id} - ${order.name}`} iconName='ti-receipt' />
        <OrderDetailItem title='Empresa' value={order.cnpj} iconName='ti-home' />
        <OrderDetailItem title='Status' value={order.status} iconName='ti-truck' />
        <OrderDetailItem title='Valor total' value={formatMoney(order.amount)} iconName='ti-money' />
        <OrderDetailItem title='Criado por' value={order.created_by} iconName='ti-user' />
        <OrderDetailItem title='Criado em' value={new Date(order.created_at).toLocaleDateString('pt-BR')} iconName='ti-timer' />
      </div>

      <div className='order-detail-item'>
        <OrderDetailItem title='Itens do pedido' value={`${order && order.products && order.products.length} produto(s)`} iconName='ti-view-list' />
      </div>

      <OrderDetailProducts>
        {
          order && order.products && order.products.map(el =>
            <OrderDetailProductCard key={el.id}>
              {handleOrderProductItem(el)}
            </OrderDetailProductCard>
          )
        }
      </OrderDetailProducts>

    </OrderDetailContainer>
  )
}

export { OrderDetail };
