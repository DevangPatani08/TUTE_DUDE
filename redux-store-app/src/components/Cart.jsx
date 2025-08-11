import { useSelector, useDispatch } from 'react-redux'
import { removeItem, clearCart, addItem } from '../features/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector(state => state.cart) || { items: [], total: 0 };
  const dispatch = useDispatch();
  
  const handleRemove = (item) => {
    dispatch(removeItem(item))
  }

  const handleIncrease = (item) => {
    dispatch(addItem(item))
  }

  const itemCount = cart.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <div>
      <h1 className="mb-4">Your Shopping Cart</h1>
      {!cart.items || cart.items.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </div>
      ) : (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.price?.toFixed(2) || '0.00'}</td>
                      <td>
                        <div className="input-group input-group-sm" style={{ width: '120px' }}>
                          <button className="btn btn-outline-danger" type="button" onClick={() => handleRemove(item)}>
                            -
                          </button>
                          <span className="form-control text-center">{item.quantity}</span>
                          <button className="btn btn-outline-success" type="button" onClick={() => handleIncrease(item)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>${((item.price || 0) * item.quantity).toFixed(2)}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">Total:</td>
                    <td colSpan="2" className="fw-bold">${cart.total?.toFixed(2) || '0.00'}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-danger" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
              <div>
                <Link to="/" className="btn btn-outline-secondary me-2">Continue Shopping</Link>
                <Link to="/payment" className="btn btn-primary" disabled={itemCount === 0}>Proceed to Payment</Link>
              </div>
            </div>
        </>
      )}
    </div>
  )
}

export default Cart