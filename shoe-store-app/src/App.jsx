import { useState } from 'react'
import './App.css'

function App() {
  // DUMMY DATA ARRAY
  const dummy_data = [
    { id: 1, name: "Running Shoes", price: 59.99, image: "https://placehold.co/600x400/000000/FFF" },
    { id: 2, name: "Casual Sneakers", price: 49.99, image: "https://placehold.co/600x400/000000/FFF" },
    { id: 3, name: "Formal Loafers", price: 79.99, image: "https://placehold.co/600x400/000000/FFF" },
    { id: 4, name: "Formal Loafers", price: 79.99, image: "https://placehold.co/600x400/000000/FFF" },
  ];

  const [cart, setCart] = useState([]);

  // add to cart handler
  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(cart.map((i) => (
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => { 
    const existingItem = cart.find((i) => i.id === id);
    if (existingItem) {
      setCart(cart.filter((i) => i.id !== id));
    } else {
      setCart(cart.map(i =>
      i.id === id ? {...i, quantity: i.quantity - 1 } : i
    ));
    }
  };
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const decrementQauntity = (id) => {
    const existingItem = cart.find((i) => i.id === id);
    if (existingItem.quantity > 1) {
      setCart(cart.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)));
    } else {
      setCart(cart.filter((i) => i.id !== id));
    }
  };

  return (
    <div className='container-fluid p-0'>
      {/* Header */}
      <header className="bg-dark text-white p-3">
        <div className="container">
          <div className="d-flex justify-content-between align-item-center">
            <h1 className="m-0">ShoeStore</h1>
            <div className="d-flex align-item-center gap-2">
              <span className="me-3 d-flex align-items-center gap-2">
                <i className="bi bi-cart-fill"></i>
                <span>Cart</span>
                <span>{cart.length}</span>
              </span>
              <button className="btn btn-outline-light">Login</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container min-vh-100 mt-4">
        <h2 className='text-center mb-4'>Our Collection</h2>
        <div className="row">
          {/* Shoe list */}
          <div className="col-md-8">
            <div className="row">
              {dummy_data.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src={item.image} alt={item.name} className='card-img-top' />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">${item.price.toFixed(2)}</p>
                      <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Shopping cart */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Your Shopping Cart</h3>
              </div>
              <div className="card-body">
                {(cart.length === 0) ? (
                  <p className="text-muted">Your cart is empty!...</p>
                ) : (
                    <>
                      {cart.map((item) => (
                          <div key={item.id} className="d-flex justify-content-between align-item-center mb-3">
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small>${(item.price * item.quantity).toFixed(2)}</small>
                            </div>
                            <div className="d-flex gap-4">
                              <div className="d-flex align-item-center">
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => decrementQauntity(item.id)}>-</button>
                                <span className="mx-4 border border-black p-2 px-3 rounded">{item.quantity}</span>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(item)}>+</button>
                              </div>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                      ))}
                      <hr />
                      <h5 className="text-end">
                        Total: <strong>${totalPrice.toFixed(2)}</strong>
                      </h5>
                      <button className='btn btn-success w-100 mt-2'>Checkout</button>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-light p-3 mt-4'>
        <div className="container text-center">
          <p className="m-0">© 2026 ShoeStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App;