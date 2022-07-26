import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMutation } from "react-query";
import { useState } from "react";
import axios from "axios";
import "../style.css";

const OneCard = ({ image, title, price, productID }) => {
  const [addedPopup, setaddedPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handlePopup = () => {
    setaddedPopup(true);

    setTimeout(() => setaddedPopup(false), 4000);
  };

  const postData = useMutation((Addproduct) => {
    axios
      .post("https://abanon-cart.herokuapp.com/cart", Addproduct)
      .catch(
        axios.patch(`https://abanon-cart.herokuapp.com/cart/${Addproduct.id}`, {
          quantity: Addproduct.quantity,
        })
      )
      .then(handlePopup());
  });
  return (
    <Card sx={{ maxWidth: 345, p: "15" }} style={{ height: "" }}>
      <CardActionArea href={`allproducts/${productID}`}>
        {" "}
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt={title}
          className="css-o69gx8-MuiCardMedia-root"
        />
        <CardContent>
          <Typography sx={{ color: "#494949" }} component="div">
            {title}
          </Typography>
          <Typography
            sx={{ color: "#494949" }}
            gutterBottom
            variant=""
            component="div"
          >
            Price: {price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-between" }}>
        <TextField
          sx={{ width: "20%", mr: "40%" }}
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
        <Button
          sx={{ background: "#1976d2", color: "#ffffff" }}
          onClick={() => {
            postData.mutate({
              id: productID,
              title: title,
              price: price,
              image: image,
              quantity: quantity,
              total: price * parseInt(quantity),
            });
          }}
          size="small"
          color="primary"
          background="ff9e80"
        >
          Add to Cart
        </Button>
      </CardActions>

      {addedPopup ? (
        <div id="addedPopup">The product was added to the cart!!</div>
      ) : null}
    </Card>
  );
};
export default OneCard;
