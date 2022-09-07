// I think here we will display cart items and then we will display the total price.
import { useMutation } from "react-query";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useQueryClient } from "react-query";
import axios from "axios";
import "../style.css";

const styledImage = {
  width: "100px",
  height: "100px",
};

const DisplayCart = ({ data }) => {
  const queryClient = new useQueryClient();
  const deleteItem = useMutation(
    (productID) => {
      return axios.delete(`https://abanon-cart.herokuapp.com/cart/${productID}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
    }
  );
 

  let total = 0;
  return (
    <div style={{ width: "100%", background: "#fefafa" }}>
      {data.map((product) => {
        total = total + product.total;
        return (
          <span key={product.id}>
            <List sx={{ ml: 25, width: "70%", mt: 5 }}>
              <ListItem sx={{ maxWidth: "100%" }} alignItems="center">
                <ListItemAvatar className="img">
                  <img
                    style={styledImage}
                    className="ss-1pqm26d-MuiAvatar-img"
                    alt="Remy Sharp"
                    src={product.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 10, mt: 1 }}
                  primary={product.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline", ml: 2 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        price : {product.price}$
                      </Typography>
                      <Typography
                        sx={{ display: "inline", ml: 2 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Quantity: {product.quantity}
                      </Typography>

                      <Typography
                        sx={{ display: "inline", ml: 2 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Total : {product.total} $
                      </Typography>
                    </>
                  }
                />
                <Button
                  onClick={() => {
                    deleteItem.mutate(product.id);
                  }}
                  size="small"
                  style={{ background: "#1976d2", color: "#ffffff" }}
                >
                  Remove
                </Button>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </span>
        );
      })}

      <div className="checkout" style={{ margin: "5px" }}>
        <h3 style={{ color: "gray", padding: "13" }}>
          Total Checkout : {total}{" "}
        </h3>
        <Button
          variant="contained"
          sx={{ m: "10px", width: "10%%" }}
          style={{ background: "#1976d2", color: "#ffffff" }}

        >
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default DisplayCart;
