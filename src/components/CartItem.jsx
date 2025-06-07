const CartItem = ({ item, onRemove, onUpdate }) => {
    return (
      <div className="cart-item">
        <div className="item-info">
          <h3>{item.name}</h3>
          <p>R$ {item.price.toFixed(2)}</p>
        </div>
        <div className="item-controls">
          <input 
            type="number" 
            min="1" 
            value={item.quantity} 
            onChange={(e) => onUpdate(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => onRemove(item.id)}>Remover</button>
        </div>
        <div className="item-total">
          R$ {(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    );
  };
  
  export default CartItem;