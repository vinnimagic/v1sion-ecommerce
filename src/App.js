import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import History from './pages/History';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;