import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { UserForm } from "./styles";

function ManageUser() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profile, setProfile] = useState('')
  const [enabled, setEnabled] = useState(false)
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function getUserById() {
      if (id !== 'new') {
        const { data } = await userService.getUserById(id);
        const { firstName, lastName, email: userEmail, profile: userProfile, isActive } = data;

        setEmail(userEmail)
        setFirstName(firstName)
        setLastName(lastName)
        setProfile(userProfile)
        setEnabled(isActive)
      }
    }
    getUserById()

    return () => {
      setEmail('')
      setFirstName('')
      setLastName('')
      setProfile('')
      setEnabled(false)
    }
  }, [id]);


  function handleFormSubmit(event) {
    event.preventDefault()

    const data = {
      email,
      firstName,
      lastName,
      profile,
      enabled
    }

    userService.saveUser(data)
  }

  return (
    <UserForm>
      <h3>{id && id !== 'new' ? id : 'Novo usuário'}</h3>
      <div id='user-form'>
        <form onSubmit={handleFormSubmit}>
          <div className='group'>
            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='first-name'>Primeiro nome</label>
            <input type='text' id='first-name' placeholder='Primeiro nome' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className='group'>
            <label htmlFor='last-name'>Último nome</label>
            <input type='text' id='last-name' placeholder='Último nome' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className='group'>
            <label>Perfil de acesso</label>
            <div className='radio-group'>
              <div>
                <input id='user-profile' name='profile' type='radio' value='USER' checked={profile === 'USER'} onChange={(e) => setProfile(e.target.value)} />
                <label htmlFor='user-profile'>Usuário</label>
              </div>
              <div>
                <input id='admin-profile' name='profile' type='radio' value='ADMIN' checked={profile === 'ADMIN'} onChange={(e) => setProfile(e.target.value)} />
                <label htmlFor='admin-profile'>Administrador</label>
              </div>
            </div>
          </div>
          <div className='group'>
            <label>Habilitar usuário?</label>
            <div className='radio-group'>
              <div>
                <input id='enabled-true' name='enabled' type='radio' value={true} checked={enabled === true} onChange={(e) => setEnabled(true)} />
                <label htmlFor='enabled-true'>Sim</label>
              </div>
              <div>
                <input id='enabled-false' name='enabled' type='radio' value={false} checked={enabled === false} onChange={(e) => setEnabled(false)} />
                <label htmlFor='enabled-false'>Não</label>
              </div>
            </div>
          </div>
          <div className='actions'>
            <button type='submit'>Salvar</button>
            <button type='button' onClick={() => navigate('/users')}>Cancelar</button>
          </div>
        </form>
      </div>
    </UserForm>
  )
}

export { ManageUser };
