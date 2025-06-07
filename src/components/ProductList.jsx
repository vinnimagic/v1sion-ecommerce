import '../styles/ProductList.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductList = ({ products }) => {
  const { addToCart } = useContext(CartContext); // Adiciona o contexto

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">R$ {product.price.toFixed(2)}</p>
            </div>
          </Link>
          <button 
            className="add-to-cart-btn" 
            onClick={() => addToCart(product)} // Adiciona a função
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;