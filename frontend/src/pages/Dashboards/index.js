import React from 'react';

function Dashboards() {
  return (
    <>
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
    </>
  )
}

export { Dashboards };
