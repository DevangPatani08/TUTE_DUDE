import React from "react";
import { useSelector } from "react-redux";

const Product = (props) => {
  const { shoe, onAddToCart, onIncrease, onDecrease } = props;
  const cartItem = useSelector((state) => (state.cart.items.find((item) => item.id === shoe.id)));
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="col">
      <div className="card h-100">
        <img src={shoe.image} className="card-img-top" alt={shoe.name} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{shoe.name}</h5>
          <p className="card-text">Price: ${shoe.price.toFixed(2)}</p>
        </div>
        <div className="card-footer bg-transparent">
          {quantity === 0 ? (
            <button className="btn btn-primary w-100" onClick={onAddToCart}>Add to Cart</button>
          ): (
              <div className="input-group">
                <button type="button" className="btn btn-outline-danger" onClick={() => onDecrease()}>
                  -
                </button>
                <input type="text" readOnly className="form-control text-center" value={quantity} />
                <button type="button" className="btn btn-outline-success" onClick={() => onIncrease()}>
                  +
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;