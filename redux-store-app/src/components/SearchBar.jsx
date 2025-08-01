import React from "react";

const SearchBar = (props) => {
  const { searchTerm, setSearchTerm} = props;
  return (
    <div className="mb-4">
      <input type="text" className="form-control form-control-lg" placeholder="Search shoes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};
export default SearchBar;