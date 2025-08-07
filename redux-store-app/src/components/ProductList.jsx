import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import Product from "./Product";
import { addItem } from "../features/cartSlice";

const ProductList = () => {
  const dummy_date = [
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