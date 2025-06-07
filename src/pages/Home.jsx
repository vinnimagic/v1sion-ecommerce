import { useState } from 'react';
import ProductList from '../components/ProductList';


const Home = () => {
  const [products] = useState([
    { 
      id: 1, 
      name: "Camiseta Branca Premium", 
      price: 49.90, 
      image: "https://static.vecteezy.com/ti/vetor-gratis/t1/20067692-3d-branco-camiseta-brincar-vetor.jpg",
      category: "Camisetas",
      rating: 4.5
    },
    { 
      id: 2, 
      name: "Calça Jeans Baggy Destroyed", 
      price: 129.90, 
      image: "https://img.lojasrenner.com.br/item/783048755/original/13.jpg",
      category: "Calças",
      rating: 4.2
    },
    { 
      id: 3, 
      name: "Tênis Nike Air Max Plus", 
      price: 199.90, 
      image: "https://acdn-us.mitiendanube.com/stores/001/038/770/products/tenis-nike-air-max-plus-masculino-604133-050-3_clipped_rev_11-b865d1fb727fc8faa116355128450739-640-0.jpeg",
      category: "Calçados",
      rating: 4.8
    },
    { 
      id: 4, 
      name: "Relógio Cartier Cravejado", 
      price: 89.90, 
      image: "https://mrmaximus.com.br/cdn/shop/files/Designsemnome-2023-09-14T081709.645.png?v=1694690250",
      category: "Acessórios",
      rating: 4.3
    },
    { 
      id: 5, 
      name: "Mochila Nike Elite Pro", 
      price: 79.90, 
      image: "https://sportness.com.br/cdn/shop/files/25fa2ff2.jpg?v=1693678610&width=800",
      category: "Acessórios",
      rating: 4.1
    },
    { 
      id: 6, 
      name: "Óculos Oakley Plantaris", 
      price: 59.90, 
      image: "https://assets2.oakley.com/cdn-record-files-pi/468817a6-9159-4d56-9666-b0c4004f18da/96dde08c-a2a0-4ddf-b419-b18701716b36/0OO9437__943701__P21__shad__qt.png",
      category: "Acessórios",
      rating: 4.4
    },
    { 
      id: 7, 
      name: "Jaqueta Bomber Premium", 
      price: 159.90, 
      image: "https://images.tcdn.com.br/img/img_prod/1069770/jaqueta_bomber_masculina_premium_1577_1_20201211170943.jpg",
      category: "Casacos",
      rating: 4.7
    },
    { 
      id: 8, 
      name: "Boné New Era 9FIFTY", 
      price: 39.90, 
      image: "https://images.tcdn.com.br/img/img_prod/745218/bone_new_era_9fifty_chicago_bulls_nba_aba_213_1_9b3b8a8d5f5a31a5c5c8a0a0a0a0a0a0.jpg",
      category: "Acessórios",
      rating: 4.0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>V1SION COMPANY</h1>
          <p className="hero-subtitle">Estilo premium para quem não segue tendências, mas as cria</p>
        </div>
      </header>

      <section className="products-section">
        <div className="section-header">
          <h2>Nossos Produtos</h2>
          <div className="controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="search-icon">🔍</i>
            </div>
            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <div className="no-results">
            <p>Nenhum produto encontrado. Tente ajustar sua busca.</p>
          </div>
        )}
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Frete Grátis</h3>
          <p>Para compras acima de R$ 200 em todo o Brasil</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Parcele em 12x</h3>
          <p>No cartão de crédito com parcelamento sem juros</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Trocas Fáceis</h3>
          <p>Política de devolução em até 30 dias</p>
        </div>
      </section>
    </div>
  );
};

export default Home;