import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const defaultValues = {
  name: "",
  price: 0,
  category: "all",
};
const Filter = ({ setFilteredInfo, info }) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let filtering = info
      .filter((product) => {
        return !formValues.name
          ? product
          : product.title.toLowerCase().includes(formValues.name.toLowerCase());
      })
      .filter((product) => {
        return !formValues.price ? product : product.price <= formValues.price;
      })
      .filter((product) => {
        return formValues.category === "all"
          ? product
          : product.category.name === formValues.category;
      });
    setFilteredInfo(filtering);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        margin={3}
        container
        alignItems="center"
        justify="center"
        direction="row"
      >
        <Grid margin={2} item>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid margin={2} item>
          <TextField
            id="price-input"
            name="price"
            label="Maximum price"
            type="number"
            value={formValues.price}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid margin={2} item>
          <FormControl>
            <Select
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
            >
              <MenuItem key="All" value="all">
                All
              </MenuItem>
              <MenuItem key="Clothes" value="Clothes">
                Clothes
              </MenuItem>
              <MenuItem key="Furniture" value="Furniture">
                Furniture
              </MenuItem>
              <MenuItem key="Electronics " value="Electronics">
                Electronics
              </MenuItem>
              <MenuItem key="Shoes " value="Shoes">
                Shoes
              </MenuItem>
              <MenuItem key="Others " value="Others">
                Others
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Button
          sx={{ background: "#1976d2", color: "#ffffff", width: "10%", ml: 3 }}
          margin={2}
          variant="contained"
          type="submit"
        >
          Filter
        </Button>
      </Grid>
    </form>
  );
};
export default Filter;
