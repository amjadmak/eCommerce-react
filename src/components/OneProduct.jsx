//We have to know how to pass the props to use them inside the fuction
import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const OneProduct = ({ ProductInfo }) => {
  const [quantity, setQuantity] = useState(1);
  const postData = useMutation((Addproduct) => {
    console.log(Addproduct);
    return fetch("https://abanon-cart.herokuapp.com/cart", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Addproduct),
    });
  });
  return (
    <Grid p={6} style={{ height: "100%" }} container spacing={2}>
      <Grid sx={{}} item xs={12} md={8}>
        <Item
          sx={{ pb: "0px" }}
          style={{
            height: "70%",
            backgroundImage: `url(${ProductInfo.images})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></Item>
        <Grid sx={{ pb: "0px" }} item xs={12} md={12}></Grid>
      </Grid>

      {/* second part (col) item 2 */}
      <Grid item xs={12} md={3}>
        <Item sx={{ pt: 4 }} style={{ height: "80%" }}>
          <h2 sx={{ mt: 10 }} className="onePageText">
            {ProductInfo.title}
          </h2>
          <div className="onePageText">
            <h4
              sx={{ mt: 3 }}
              className="onePageText"
              style={{ textAlign: "left" }}
            >
              {ProductInfo.description}
            </h4>
            <Item
              className="onePageText"
              variant="contained"
              sx={{ textAlign: "left" }}
            >
              <h3>Price: {ProductInfo.price} $</h3>
            </Item>
          </div>
          {/* under the  text */}
          <div className="onePageAddtoCart">
            <Button
              variant="contained"
              sx={{
                m: "10px",
                width: "90%",
                background: "#ff9e80",
                color: "#ffffff",
              }}
              onClick={() => {
                postData.mutate({
                  id: ProductInfo.id,
                  title: ProductInfo.title,
                  price: ProductInfo.price,
                  image: ProductInfo.images[0],
                  quantity: quantity,
                  total: ProductInfo.price * parseInt(quantity),
                });
              }}
            >
              Add to cart
            </Button>
            <TextField
              sx={{}}
              type="number"
              value={quantity}
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            ></TextField>
          </div>
        </Item>
      </Grid>
    </Grid>
  );
};
export default OneProduct;
