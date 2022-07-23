import React from "react";
import Filter from "../components/Filter";
import ListOfProducts from "../components/ListOfProducts";

const AllProducts = ({ info, filteredInfo, setFilteredInfo}) => {

  return (
    <>
   
      <Filter  info={info} setFilteredInfo={setFilteredInfo}  />
      <ListOfProducts filteredInfo={filteredInfo}/>
    </>
  );
};
export default AllProducts;
