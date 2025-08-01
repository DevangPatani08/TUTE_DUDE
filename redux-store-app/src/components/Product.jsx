import React from "react";

const Product = (props) => {
  const { shoe, onAddToCart } = props;
  return (
    <div className="col">
      <div className="card h-100">
        <img src={shoe.image} className="card-img-top" alt={shoe.name} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{shoe.name}</h5>
          <p className="card-text">Price: ${shoe.price.toFixed(2)}</p>
        </div>
        <div className="card-footer bg-transparent">
          <button className="btn btn-primary w-100" onClick={onAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;