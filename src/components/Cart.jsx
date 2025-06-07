import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container">
      <div className="cart-title">
        <h2>Seu Carrinho</h2>
        {cart.length > 0 && (
          <button onClick={clearCart} className="remove-btn">
            Limpar Carrinho
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Seu carrinho está vazio</p>
          <Link to="/" className="empty-cart-btn">
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-image" 
                  />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">R$ {item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="item-actions">
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="remove-btn"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total:</span>
            <span className="cart-total-amount">R$ {total.toFixed(2)}</span>
          </div>
            <br>
            </br>
          <Link to="/history" className="checkout-btn">
            Finalizar Compra
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;