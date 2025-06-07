import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/ProductDetail.css';



const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulating product fetch (in a real app, this would be an API call)
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const products = [
          { 
            id: 1, 
            name: "Camiseta Branca", 
            price: 49.90, 
            description: "Camiseta 100% algodão",
            image: "https://static.vecteezy.com/ti/vetor-gratis/t1/20067692-3d-branco-camiseta-brincar-vetor.jpg",
            sizes: ["P", "M", "G", "GG"],
            colors: ["Branco", "Preto", "Azul"]
          },
          { 
            id: 2, 
            name: "Calça Jeans", 
            price: 129.90, 
            description: "Calça jeans moderna",
            image: "https://img.lojasrenner.com.br/item/783048755/original/13.jpg ",
            sizes: ["38", "40", "42", "44"],
            colors: ["Azul Claro", "Azul Escuro", "Preto"]
          },
          // ... other products
        ];
        
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (!foundProduct) {
          throw new Error('Produto não encontrado');
        }
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="not-found">Produto não disponível</div>;

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image || "https://via.placeholder.com/300x400?text=Produto"} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
        <p className="description">{product.description}</p>
        
        {product.sizes && (
          <div className="sizes">
            <h3>Tamanhos:</h3>
            <div className="size-options">
              {product.sizes.map(size => (
                <button key={size} className="size-btn">{size}</button>
              ))}
            </div>
          </div>
        )}
        
        {product.colors && (
          <div className="colors">
            <h3>Cores:</h3>
            <div className="color-options">
              {product.colors.map(color => (
                <button 
                  key={color} 
                  className="color-btn" 
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
        
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;