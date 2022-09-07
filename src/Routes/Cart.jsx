import React from "react";
import { useQuery } from "react-query";
import DisplayCart from "../components/DisplayCart";
import axios from "axios";
const Cart = () => {
  const { isLoading, error, data } = useQuery("cart", () =>
    axios(`https://abanon-cart.herokuapp.com/cart`)
      .then((data) => {
        return data.data;
      })
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <DisplayCart data={data} />
    </div>
  );
};

export default Cart;
