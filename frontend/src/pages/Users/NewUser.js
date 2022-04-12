import React, { useState } from "react";
import userService from "../../services/userService";
import { UserForm } from "./styles";

function NewUser() {
  const [email, setEmail] = useState('breach.valorant@sipe.com')
  const [firstName, setFirstName] = useState('Breach')
  const [lastName, setLastName] = useState('Valorant')
  const [profile, setProfile] = useState('USER')
  const [enabled, setEnabled] = useState(true)

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
      <h3>Novo usuário</h3>
      <div id='user-form'>
        <form onSubmit={handleFormSubmit}>
          <div className='email-group'>
            <input type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='name-group'>
            <input placeholder='Primeiro nome' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input placeholder='Último nome' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div id='profile-group'>
            <label>Perfil</label>
            <div>
              <input id='user-profile' name='profile' type='radio' value='USER' checked={profile === 'USER'} onChange={(e) => setProfile(e.target.value)} />
              <label htmlFor='user-profile'>Usuário</label>
              <input id='admin-profile' name='profile' type='radio' value='ADMIN' checked={profile === 'ADMIN'} onChange={(e) => setProfile(e.target.value)} />
              <label htmlFor='admin-profile'>Administrador</label>
            </div>
          </div>
          <div id='enabled-group'>
            <label>Ativo</label>
            <div>
              <input id='enabled-true' name='enabled' type='radio' value={true} checked={enabled === true} onChange={(e) => setEnabled(true)} />
              <label htmlFor='enabled-true'>Sim</label>
              <input id='enabled-false' name='enabled' type='radio' value={false} checked={enabled === false} onChange={(e) => setEnabled(false)} />
              <label htmlFor='enabled-false'>Não</label>
            </div>
          </div>
          <div>
            <button type='submit'>Salvar</button>
          </div>
        </form>
      </div>
    </UserForm>
  )
}

export { NewUser };
