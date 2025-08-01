import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart } from '../features/cartSlice'
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (cart.items.length === 0) {
      alert('Your cart is empty! Redirecting to shop...')
      navigate('/')
      return
    }

    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      alert('Please fill in all payment details')
      return
    }

    alert(`Payment of $${cart.total.toFixed(2)} processed successfully!`)
    dispatch(clearCart());
    navigate('/');
  }

  return (
    <div className="row">
      <div className="col-md-8 mb-5">
        <h1 className="mb-4">Payment Information</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                className="form-control"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">CVV</label>
              <input
                type="text"
                className="form-control"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                placeholder="123"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              className="form-control"
              name="nameOnCard"
              value={cardDetails.nameOnCard}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={cart.items.length === 0}
          >
            Pay ${cart.total.toFixed(2)}
          </button>
        </form>
      </div>
      
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            {cart.items.length > 0 ? (
              <>
                <ul className="list-group list-group-flush mb-3">
                  {cart.items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                      <span>
                        {item.name} <small className="text-muted">x{item.quantity}</small>
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="alert alert-warning">
                Your cart is empty. <Link to="/">Continue shopping</Link>
              </div>
            )}
          </div>
          <div className="card-footer bg-transparent">
            <Link to="/cart" className="btn btn-outline-secondary w-100">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;