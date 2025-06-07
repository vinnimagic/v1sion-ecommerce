import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">V 1 S I O N</Link>
      <div className="nav-links">
        <Link to="/">Produtos</Link>
        <Link to="/checkout">
          Carrinho ({cart.reduce((total, item) => total + item.quantity, 0)})
        </Link>
        <Link to="/history">Histórico</Link>
      </div>
    </nav>
  );
};

export default Navbar;