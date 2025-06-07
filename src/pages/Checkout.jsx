import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart, addOrderToHistory } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    addOrderToHistory(order);
    clearCart();
    navigate('/history');
  };

  return (
    <div className="checkout-page">
      <center>
      <h1>Finalizar Compra</h1>
      </center>
      <Cart />
      {cart.length > 0 && (
        <button onClick={handleCheckout} className="btn-checkout">
          Confirmar Pedido
        </button>
      )}
    </div>
  );
};

export default Checkout;