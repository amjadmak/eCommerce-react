import React from "react";
import { useQuery } from "react-query";
import DisplayCart from "../components/DisplayCart";

const Cart = () => {
  const { isLoading, error, data } = useQuery("cart", () =>
    fetch(`https://abanon-cart.herokuapp.com/cart`)
      .then((res) => res.json())
      .then((data) => {
        return data;
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
