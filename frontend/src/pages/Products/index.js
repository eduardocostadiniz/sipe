import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import LoadingContext from "../../contexts/loadingContext";
import { StatusChip } from "../../components/Chip";
import { TableBody, TableHeader, TableWrapper } from "../../components/Table";
import productService from "../../services/productService";
import { ProductData, ProductContainer, ProductTableActions } from "./styles";

function Products() {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [products, setProducts] = useState(undefined);

  const PRODUCTS_TABLE_HEADERS = [
    'ID', 'Imagem', 'Nome', 'Preço', 'Status', ''
  ];

  useEffect(() => {
    getProducts()

    return () => {
      setProducts([])
    }
  }, [])


  async function getProducts() {
    try {
      setIsLoading(true);
      const { data } = await productService.getProducts();

      setProducts(data.products)

    } finally {
      setIsLoading(false)
    }
  }

  function handleAdminProductAction() {
    if (user && user.profile === 'ADMIN') {
      return (
        <ProductTableActions>
          <button onClick={() => navigate('/products/new')}>Novo Produto</button>
        </ProductTableActions>
      )
    }
    return <></>
  }

  function handlePrice(price) {
    return `R$ ${Number(price).toFixed(2).replace('.', ',')}`;
  }

  return (
    <ProductContainer>
      {handleAdminProductAction()}
      <ProductData>
        <TableWrapper cardLabel='Produtos'>
          <TableHeader headers={PRODUCTS_TABLE_HEADERS} />
          <TableBody>
            {
              products && products.map(el => (
                <tr key={String(el.id)}>
                  <td>{el.id}</td>
                  <td>
                    <img className='product-image' src={el.img_url} alt='Foto' />
                  </td>
                  <td>{el.name}</td>
                  <td>{handlePrice(el.price)}</td>
                  <td>
                    {
                      el.is_active
                        ? <StatusChip chipLabel='ATIVO' status='success' />
                        : <StatusChip chipLabel='INATIVO' status='error' />
                    }
                  </td>
                  <td>
                    <button className='edit-action' onClick={() => navigate(`/products/${el.id}`)}>Editar</button>
                  </td>
                </tr>
              ))
            }
          </TableBody>
        </TableWrapper >
      </ProductData>
    </ProductContainer >
  )
}

export { Products };
