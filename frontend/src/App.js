import React from 'react';

import EduGhostPlayerImg from './assets/img/EduGhostPlayer.jpg';
import YelaWolfImg from './assets/img/yelawolf.jpg';

import './assets/themefy/themify-icons.css';
import './assets/css/global.css';

function App() {
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
            <li>
              <span className="ti-plus"></span>
              <label>Clientes</label>
            </li>
            <li>
              <span className="ti-package"></span>
              <label>Produtos</label>
            </li>
            <li>
              <span className="ti-list"></span>
              <label>Pedidos</label>
            </li>
            <li>
              <span className="ti-money"></span>
              <label>Pagamentos</label>
            </li>
            <li>
              <span className=" ti-settings"></span>
              <label>Configurações</label>
            </li>
          </ul>
        </div>
      </div>

      <main className="main-container">
        <header className="header-container">
          <div className="user-actions">
            <span className="ti-shopping-cart"></span>
            <span className="ti-bell"></span>
          </div>
          <div className="user-avatar">
            <img src={YelaWolfImg} alt="User avatar" />
          </div>
        </header>

        <div className="content-container">
          <div className="card-groups">
            <div className="card-single">
              <span className="ti-star"></span>
              <div className="card-info">
                <label>Valor dos pedidos no mês</label>
                <span>R$ 12.345, 00</span>
              </div>
            </div>
            <div className="card-single">
              <span className="ti-stats-up"></span>
              <div className="card-info">
                <label>Total de pedidos no mês</label>
                <span>142</span>
              </div>
            </div>
            <div className="card-single">
              <span className="ti-stats-down"></span>
              <div className="card-info">
                <label>Total de pedidos cancelados</label>
                <span>15</span>
              </div>
            </div>
          </div>

          <div className="order-last-activity">
            <h3>Pedidos recentes</h3>
            <table>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12345</td>
                  <td>Bunker NY</td>
                  <td>
                    <label className="order-status order-pending">PENDENTE</label>
                  </td>
                  <td>R$ 1.322,49</td>
                </tr>
                <tr>
                  <td>14345</td>
                  <td>Loja YT Inc</td>
                  <td>
                    <label className="order-status order-success">FINALIZADO</label>
                  </td>
                  <td>R$ 322,49</td>
                </tr>
                <tr>
                  <td>21433</td>
                  <td>G-Eazy Store</td>
                  <td>
                    <label className="order-status order-success">FINALIZADO</label>
                  </td>
                  <td>R$ 19.399,49</td>
                </tr>
                <tr>
                  <td>89457</td>
                  <td>GOP Maresia</td>
                  <td>
                    <label className="order-status order-cancelled">CANCELADO</label>
                  </td>
                  <td>R$ 8.877,21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export default App;
