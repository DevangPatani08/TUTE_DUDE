import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cartSlice';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Logic for Card Number
    if (name === 'cardNumber') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 16 digits
      const trimmedDigits = digitsOnly.substring(0, 16);
      // Add a space after every 4 digits
      formattedValue = trimmedDigits.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Logic for Expiry Date
    if (name === 'expiryDate') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 4 digits (MMYY)
      const trimmedDigits = digitsOnly.substring(0, 4);
      // Auto-add '/' after MM
      if (trimmedDigits.length > 2) {
        formattedValue = `${trimmedDigits.substring(0, 2)}/${trimmedDigits.substring(2, 4)}`;
      } else {
        formattedValue = trimmedDigits;
      }
    }
    
    // Logic for CVV
    if (name === 'cvv') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 3 digits
      formattedValue = digitsOnly.substring(0, 3);
    }
    
    // Logic for Name on Card
    if (name === 'nameOnCard') {
      // Only allow alphabetic characters and spaces
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const currentYear = today.getFullYear() % 100; // Get last two digits of the year
    const currentMonth = today.getMonth() + 1; // Month is 0-indexed

    // Card Number validation
    const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'Card number is required.';
    } else if (cleanCardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }

    // Expiry Date validation
    const [mm, yy] = cardDetails.expiryDate.split('/');
    if (!mm || !yy) {
      newErrors.expiryDate = 'Expiry date is required.';
    } else if (parseInt(mm, 10) < 1 || parseInt(mm, 10) > 12) {
      newErrors.expiryDate = 'Invalid month.';
    } else if (parseInt(yy, 10) < currentYear || (parseInt(yy, 10) === currentYear && parseInt(mm, 10) < currentMonth)) {
      newErrors.expiryDate = 'Card has expired.';
    }

    // CVV validation
    if (!cardDetails.cvv) {
      newErrors.cvv = 'CVV is required.';
    } else if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    // Name on Card validation
    const nameParts = cardDetails.nameOnCard.trim().split(/\s+/);
    if (nameParts.length < 2) {
      newErrors.nameOnCard = 'Please enter a first and last name.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      alert('Your cart is empty! Redirecting to shop...');
      navigate('/');
      return;
    }

    if (validateForm()) {
      alert(`Payment of $${cart.total.toFixed(2)} processed successfully!`);
      dispatch(clearCart());
      navigate('/');
    } else {
      alert('Please correct the form errors.');
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 mb-5">
        <h1 className="mb-4">Payment Information</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
            />
            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
              {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">CVV</label>
              <input
                type="password"
                className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                placeholder="•••"
                maxLength="3"
                required
              />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              className={`form-control ${errors.nameOnCard ? 'is-invalid' : ''}`}
              name="nameOnCard"
              value={cardDetails.nameOnCard}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
            {errors.nameOnCard && <div className="invalid-feedback">{errors.nameOnCard}</div>}
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
                  {cart.items.map((item) => (
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
  );
};

export default Payment;
