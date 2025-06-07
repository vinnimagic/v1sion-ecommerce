import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedHistory = localStorage.getItem('orderHistory');
    if (savedHistory) setOrderHistory(JSON.parse(savedHistory));
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrderToHistory = (order) => {
    const newHistory = [order, ...orderHistory];
    setOrderHistory(newHistory);
    localStorage.setItem('orderHistory', JSON.stringify(newHistory));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      orderHistory,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addOrderToHistory
    }}>
      {children}
    </CartContext.Provider>
  );
};