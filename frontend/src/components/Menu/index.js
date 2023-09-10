import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { InputContainer, MenuContainer, BrandInfo, MenuOptions } from './styles';

import EduGhostPlayerImg from '../../assets/img/EduGhostPlayer.jpg';
import { useAuth0 } from "@auth0/auth0-react";


function MenuItem({ path, iconName, name }) {
  let navigate = useNavigate();

  return (
    <li onClick={() => navigate(path)}>
      <span className={iconName}></span>
      <label>{name}</label>
    </li>
  );
}

function MenuItemAction({ action }) {
  return (
    <li onClick={() => action()}>
      <span className='ti-shift-right'></span>
      <label>Sair</label>
    </li>
  );
}

function Menu() {
  const { logout } = useAuth0()

  return (
    <>
      <InputContainer id='menu-toggle' type='checkbox' />
      <MenuContainer className='menu-container'>
        <BrandInfo className="brand-info">
          <img src={EduGhostPlayerImg} alt="Brand" />
          <label htmlFor="menu-toggle" className="ti-menu"></label>
        </BrandInfo>
        <MenuOptions className="menu-options">
          <ul>
            <MenuItem path='/' iconName='ti-home' name='Home' />
            <MenuItem path='/clients' iconName='ti-plus' name='Clientes' />
            <MenuItem path='/products' iconName='ti-package' name='Produtos' />
            <MenuItem path='/orders' iconName='ti-list' name='Pedidos' />
            <MenuItem path='/payments' iconName='ti-money' name='Pagamentos' />
            <MenuItem path='/users' iconName='ti-user' name='Usuários' />
            <MenuItem path='/settings' iconName='ti-settings' name='Configurações' />
            <MenuItemAction action={logout} />
          </ul>
        </MenuOptions>
      </MenuContainer>
    </>
  )
}

export { Menu };
