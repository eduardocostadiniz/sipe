import React from "react";
import { Link, useNavigate } from "react-router-dom";

import EduGhostPlayerImg from '../../assets/img/EduGhostPlayer.jpg';

function Menu() {
  let navigate = useNavigate();
  return (
    <>
      <input type="checkbox" id="menu-toggle" />
      <div className="menu-container">
        <div className="brand-info">
          <img src={EduGhostPlayerImg} alt="Brand" />
          <label htmlFor="menu-toggle" className="ti-menu"></label>
        </div>
        <div className="menu-options">
          <ul>
            <li onClick={() => navigate('/')}>
              <span className="ti-home"></span>
              <label>Home</label>
            </li>
            <li onClick={() => navigate('/clients')}>
              <span className="ti-plus"></span>
              <label>Clientes</label>
            </li>
            <li onClick={() => navigate('/products')}>
              <span className="ti-package"></span>
              <label>Produtos</label>
            </li>
            <li onClick={() => navigate('/orders')}>
              <span className="ti-list"></span>
              <label>Pedidos</label>
            </li>
            <li onClick={() => navigate('/payments')}>
              <span className="ti-money"></span>
              <label>Pagamentos</label>
            </li>
            <li onClick={() => navigate('/users')}>
              <span className="ti-user"></span>
              <label>Usuários</label>
            </li>
            <li onClick={() => navigate('/settings')}>
              <span className=" ti-settings"></span>
              <label>Configurações</label>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export { Menu };
