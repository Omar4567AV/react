import { Link } from 'react-router-dom';

const Cart = ({ cartItems, updateQuantity, handleRemove }) => {
  const parsePrice = (priceStr) => Number(priceStr.replace(/[^0-9.-]+/g, "")) || 0;

  const total = cartItems.reduce((sum, item) => {
    return sum + (parsePrice(item.price) * item.quantity);
  }, 0);

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          {cartItems.map((item) => {
            const itemPrice = parsePrice(item.price);
            const subtotal = itemPrice * item.quantity;
            
            return (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', flex: 1 }}>
                  <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                  
                  <div className="cart-info" style={{ marginLeft: '15px' }}>
                    <h3>{item.title}</h3>
                    <p>Price: {item.price}</p>
                    <p style={{ fontWeight: 'bold' }}>Subtotal: ${subtotal}</p>
                  </div>
                </Link>

                <div className="cart-actions">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                    Remove ❌
                  </button>
                </div>
              </div>
            );
          })}

          <h2 className="cart-total">Total: ${total}</h2>
          <div style={{ textAlign: 'right', marginTop: '15px' }}>
            <Link to="/checkout" className="buy-btn" style={{ textDecoration: 'none' }}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;