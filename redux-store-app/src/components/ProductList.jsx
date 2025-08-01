import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import Product from "./Product";
import { addItem } from "../features/cartSlice";

const ProductList = () => {
  const dummy_date = [
    { id: 1, name: "Running Shoes", price: 59.99, image: "https://placehold.co/600x400/000000/FFF" },
    { id: 2, name: "Casual Sneakers", price: 49.99, image: "https://placehold.co/600x400/000000/FFF" },
    { id: 3, name: "Formal Loafers", price: 79.99, image: "https://placehold.co/600x400/000000/FFF" },
    { id: 4, name: "Formal Loafers", price: 79.99, image: "https://placehold.co/600x400/000000/FFF" }
  ];

  
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filterShoes = dummy_date.filter(shoe => shoe.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addToCartHandler = (shoe) => {
    dispatch(addItem(shoe));
  };

  return (
    <div>
      <h1 className="mb-4">Our Shoe Collection</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filterShoes.length === 0 ? (
        <div className="alert alert-warning">
          <strong>Warning!</strong> No shoes found matching your search term.
        </div>
      ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {filterShoes.map(shoe => (
              <Product key={shoe.id} shoe={shoe} onAddToCart={() => addToCartHandler(shoe)} />
            ))}
          </div>
      )}
    </div>
  );
};

export default ProductList;