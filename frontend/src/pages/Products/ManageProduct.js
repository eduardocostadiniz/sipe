import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingContext from "../../contexts/loadingContext";
import productService from "../../services/productService";
import { ProductForm } from "./styles";

function ManageProduct() {
  const { setIsLoading } = useContext(LoadingContext);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0.00)
  const [imgUrl, setImgUrl] = useState('')
  const [enabled, setEnabled] = useState(true)
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function getProductById() {
      if (id !== 'new') {
        try {
          setIsLoading(true)
          const { data } = await productService.getProductById(id);
          const { img_url: imgProduct, is_active: isActive } = data.product;

          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setImgUrl(imgProduct)
          setEnabled(isActive)

        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false)
        }
      }
    }
    getProductById()

    return () => {
      clearFields()
    }
  }, [id]);

  function clearFields() {
    setName('')
    setDescription('')
    setPrice(0.0)
    setImgUrl('')
    setEnabled('')
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    try {
      setIsLoading(true)

      const data = {
        id: (id && id !== 'new' ? id : null),
        name,
        description,
        price,
        imgUrl,
        isActive: enabled
      }

      await productService.saveProduct(data)
      clearFields()
      setTimeout(() => navigate('/products'), 2000);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePrice(event) {
    const value = Number(event.target.value)
    setPrice(value && value > 0 ? value : 0.00)
  }

  return (
    <ProductForm>
      <div id='product-form'>
        <form onSubmit={handleFormSubmit}>
          <div className='group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' id='name' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='description'>Descrição</label>
            <textarea id='description' placeholder='Descrição' rows={5} maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='price'>Preço</label>
            <input type='number' step={0.01} id='price' placeholder='0,00' value={String(Number(price))} onChange={handlePrice} />
          </div>
          <div className='group'>
            <label htmlFor='imgUrl'>Caminho da imagem</label>
            <input type='url' id='imgUrl' placeholder='https://' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          </div>
          <div className='group'>
            <label>Habilitar produto?</label>
            <div className='radio-group'>
              <div>
                <input id='enabled-true' name='enabled' type='radio' value={true} checked={enabled === true} onChange={() => setEnabled(true)} />
                <label htmlFor='enabled-true'>Sim</label>
              </div>
              <div>
                <input id='enabled-false' name='enabled' type='radio' value={false} checked={enabled === false} onChange={() => setEnabled(false)} />
                <label htmlFor='enabled-false'>Não</label>
              </div>
            </div>
          </div>
          <div className='actions'>
            <button type='submit'>Salvar</button>
            <button type='button' onClick={() => navigate('/products')}>Cancelar</button>
          </div>
        </form>
      </div>
    </ProductForm>
  )
}

export { ManageProduct };
