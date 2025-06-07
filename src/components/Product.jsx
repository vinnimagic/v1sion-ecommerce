import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Notification from './Notification';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    try {

      addToCart(product);
      
      setShowNotification(true);
      
      console.log('Produto adicionado:', product);
      
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">R$ {product.price.toFixed(2)}</p>
      </Link>
      
      <button 
        onClick={handleAddToCart} 
        className="add-to-cart-btn"
        aria-label={`Adicionar ${product.name} ao carrinho`}
      >
        Adicionar ao Carrinho
      </button>
      
      <Notification 
        message={`${product.name} adicionado ao carrinho!`}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default Product;