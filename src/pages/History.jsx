import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/History.css';

const History = () => {
  const { orderHistory } = useContext(CartContext);

  return (
    <div className="history-page">
      <h1>Histórico de Pedidos</h1>
      {orderHistory.length === 0 ? (
        <p>Nenhum pedido realizado ainda.</p>
      ) : (
        <div className="order-list">
          {orderHistory.map(order => (
            <div key={order.id} className="order">
              <div className="order-header">
                <h3>Pedido #{order.id}</h3>
                <p>{order.date}</p>
              </div>
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: R$ {order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;