import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingContext from "../../contexts/loadingContext";
import clientService from "../../services/clientService";
import { ClientForm } from "./styles";

function ManageClient() {
  const { setIsLoading } = useContext(LoadingContext);
  const [cnpj, setCnpj] = useState('')
  const [name, setName] = useState('')
  const [trademark, setTrademark] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enabled, setEnabled] = useState(true)
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function getClientByCnpj() {
      if (id !== 'new') {
        try {
          setIsLoading(true)
          const { data } = await clientService.getClientByCnpj(id);
          const { name: clientName, trademark: clientTrademark, email: clientEmail, phone: clientPhone, is_active: isActive } = data.client;

          setCnpj(id)
          setName(clientName)
          setTrademark(clientTrademark)
          setEmail(clientEmail)
          setPhone(clientPhone)
          setEnabled(isActive)
          setIsLoading(false)

        } catch (err) {
          console.log(err);
          setIsLoading(false)
        }
      }
    }
    getClientByCnpj()

    return () => {
      clearFields()
    }
  }, [id]);


  function clearFields() {
    setCnpj('')
    setName('')
    setTrademark('')
    setEmail('')
    setPhone('')
    setEnabled(true)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    try {
      setIsLoading(true)

      const data = {
        cnpj,
        name,
        trademark,
        email,
        phone,
        isActive: enabled
      }

      await clientService.saveClient(data)

      setIsLoading(false);
      clearFields()
      setTimeout(() => navigate('/clients'), 2000);

    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <ClientForm>
      <div id='client-form'>
        <form onSubmit={handleFormSubmit}>
          <div className='group'>
            <label htmlFor='cnpj'>CNPJ</label>
            <input type='text' id='cnpj' placeholder='CNPJ' disabled={id && id !== 'new'} value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='name'>Nome</label>
            <input type='text' id='name' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='trademark'>Nome Fantasia</label>
            <input type='text' id='trademark' placeholder='Nome Fantasia' value={trademark} onChange={(e) => setTrademark(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='phone'>Telefone</label>
            <input type='text' id='phone' placeholder='Telefone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className='group'>
            <label>Habilitar cliente?</label>
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
            <button type='button' onClick={() => navigate('/clients')}>Cancelar</button>
          </div>
        </form>
      </div>
    </ClientForm>
  )
}

export { ManageClient };
