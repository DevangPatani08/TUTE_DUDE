import { useState } from 'react'
import './App.css'

function App() {
  // DUMMY DATA ARRAY
  const dummy_data = [
    { id: 1, name: "Nike Air Jordan 1 Retro", price: 179.99, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" },
    { id: 2, name: "Adidas Yeezy Boost 350", price: 220.00, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
    { id: 3, name: "Puma Future Rider", price: 89.95, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" },
    { id: 4, name: "Converse Run Star Hike", price: 110.00, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2" },
    { id: 5, name: "Vans UltraRange Exo", price: 84.99, image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f" },
    { id: 6, name: "New Balance 990v5", price: 174.99, image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329" },
    { id: 7, name: "Reebok Nano X1", price: 129.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
    { id: 8, name: "Asics Gel-Kayano 28", price: 159.95, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86" },
    { id: 9, name: "Salomon XT-6 Advanced", price: 180.00, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d" },
    { id: 10, name: "Hoka One One Clifton 8", price: 139.95, image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28" },
    { id: 11, name: "Under Armour Curry Flow 8", price: 149.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 12, name: "Brooks Ghost 14", price: 129.95, image: "https://cdn.runrepeat.com/storage/gallery/product_content/37504/brooks-ghost-14-15087693-main.jpg" },
    { id: 13, name: "Saucony Endorphin Speed", price: 159.99, image: "https://m.media-amazon.com/images/I/71BczH9EtWL._UY1000_.jpg" },
    { id: 14, name: "On Cloudstratus", price: 169.95, image: "https://cdn.runrepeat.com/storage/gallery/product_content/32397/on-cloudstratus-2-20211789-main.jpg" },
    { id: 15, name: "Merrell Moab 2 Vent", price: 119.95, image: "https://hikemuch.com/wp-content/uploads/merrell-moab-2-vent-review-featured.jpg" },
    { id: 16, name: "Skechers Arch Fit", price: 74.99, image: "https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw491e8ef7/images/large/196642236331-1.jpg" },
    { id: 17, name: "Ecco Soft 7", price: 149.95, image: "https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw9bc6995a/images/large/191665893936-1.jpg" },
    { id: 18, name: "Cole Haan Zerogrand", price: 199.95, image: "https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw6a0f88c5/images/large/196989985879-1.jpg" },
    { id: 19, name: "Clarks Desert Boot", price: 129.99, image: "https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw88b22d8e/images/large/195204981894-1.jpg" },
    { id: 20, name: "Allbirds Wool Runner", price: 95.00, image: "https://www.skechers.co.nz/media/catalog/product/2/2/220336_rdnv_e_large.jpg?auto=webp&quality=85&format=pjpg&width=100%25&fit=cover" },
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