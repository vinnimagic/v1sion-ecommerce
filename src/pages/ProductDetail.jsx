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
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    // Simulação de chamada API - na prática, substitua por uma chamada real
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Dados mockados - em produção, usar API
        const mockProducts = [
          { 
            id: 1, 
            name: "Camiseta Branca Premium", 
            price: 49.90, 
            description: "Camiseta 100% algodão com corte premium.",
            image: "https://static.vecteezy.com/ti/vetor-gratis/t1/20067692-3d-branco-camiseta-brincar-vetor.jpg",
            sizes: ["P", "M", "G", "GG"],
            colors: ["Branco", "Preto", "Azul"]
          },
          { 
            id: 2, 
            name: "Calça Jeans Baggy", 
            price: 129.90, 
            description: "Calça jeans estilo baggy moderno.",
            image: "https://img.lojasrenner.com.br/item/783048755/original/13.jpg",
            sizes: ["38", "40", "42", "44"],
            colors: ["Azul Claro", "Azul Escuro", "Preto"]
          },
          {
            id: 3,
            name: "Tênis Nike Air Max Plus", 
            price: 199.90, 
            image: "https://acdn-us.mitiendanube.com/stores/001/038/770/products/tenis-nike-air-max-plus-masculino-604133-050-3_clipped_rev_11-b865d1fb727fc8faa116355128450739-640-0.jpeg",
            sizes: ["38","40","42"],
            colors: ["Preto", "Azul Claro", "Vermelho"]
          },
          {
            id: 4, 
            name: "Relógio Cartier Cravejado", 
            description: "Relógio Cartier Cravejado de diamantes, utilizado para quem quer luxo e estilo",
            price: 89.90, 
            image: "https://mrmaximus.com.br/cdn/shop/files/Designsemnome-2023-09-14T081709.645.png?v=1694690250",
            sizes: ["UNICO"]
          },
          {
             id: 5, 
            name: "Mochila Nike Elite Pro",
            description: "Aquela bolsa que voce usa pra carregar suas joias e coisas que você sabe nego",
            price: 79.90, 
            image: "https://sportness.com.br/cdn/shop/files/25fa2ff2.jpg?v=1693678610&width=800",
          },
          {
            id: 6, 
            name: "Óculos Oakley Plantaris",
            description: "Esse é o puro da Oakley x Podpah, quer andar vendo até o papa, esse é o brabo!",
            price: 59.90, 
            image: "https://assets2.oakley.com/cdn-record-files-pi/468817a6-9159-4d56-9666-b0c4004f18da/96dde08c-a2a0-4ddf-b419-b18701716b36/0OO9437__943701__P21__shad__qt.png",

          },
          {
             id: 7, 
            name: "Jaqueta Bomber Premium", 
            price: 159.90, 
            image: "https://static.netshoes.com.br/produtos/jaqueta-bomber-hering-lisa-masculina/40/ARI-4163-040/ARI-4163-040_zoom1.jpg?ts=1614356656&ims=1088x",
            colors: ["Preto", "Azul Claro", "Vermelho"],
            sizes: ["P","M","G"]
          },
          {
             id: 8, 
            name: "Boné New Era 9FIFTY", 
            price: 39.90, 
            image: "https://th.bing.com/th/id/OIP.mJKIz17H9Lq7QL95fwv4WAHaHa?rs=1&pid=ImgDetMain",
            colors: ["Preto", "Azul Claro", "Vermelho"],
            sizes: ["P","M","G"]
          }
        ];

        const foundProduct = mockProducts.find(p => p.id === Number(id));
        
        if (!foundProduct) {
          throw new Error('Produto não encontrado');
        }

        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes?.[0] || '');
        setSelectedColor(foundProduct.colors?.[0] || '');
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1
    });
  };

  if (loading) {
    return <div className="loading">Carregando produto...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="not-found">Produto não encontrado</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-gallery">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image-main" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://via.placeholder.com/300x400?text=Imagem+Indisponível";
          }}
        />
      </div>
      
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </p>
        <p className="product-description">{product.description}</p>
        
        {product.sizes && product.sizes.length > 0 && (
          <div className="size-selector">
            <h3>Tamanhos:</h3>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {product.colors && product.colors.length > 0 && (
          <div className="color-selector">
            <h3>Cores:</h3>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: color.toLowerCase().includes('branco') ? '#f5f5f5' : 
                                  color.toLowerCase().includes('preto') ? '#000' : 
                                  color.toLowerCase().includes('azul') ? '#3498db' : color,
                    border: color.toLowerCase() === 'branco' ? '1px solid #ddd' : 'none'
                  }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="product-actions">
          <button 
            className="action-btn primary-btn"
            onClick={handleAddToCart}
            disabled={!product}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;