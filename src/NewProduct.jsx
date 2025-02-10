import Paper from "@mui/material/Paper";
import { Grid2, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const NewProduct = () => {
  const [NewProduct, setNewproduct] = useState({
    title: "",
    price: 500,
    description: "",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 0,
      count: 0,
    },
  });


  let handlechange = (e) => {
    let { value, name } = e.target;

    let fieldname = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setNewproduct({
        ...NewProduct,
        rating: {
          ...NewProduct.rating,
          [fieldname]: value,
        },
      });
    } else {
      setNewproduct({
        ...NewProduct,
        [name]: value,
      });
    }
  };

  let handleAdd = (e) => {
     e.preventDefault()
     fetch("http://localhost:3000/products",{method:"POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(NewProduct)
     })
     .then(()=>{
      alert("Data successfully saved")
      setNewproduct({
        
          title: "",
          price: 500,
          description: "",
          category: "",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          rating: {
            rate: 0,
            count: 0,
          }

      })
     })
     
  }

  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "10px",
  };

  return (
    <Paper elevation={20} style={paperstyle}>
      <Typography
        variant="h4"
        textAlign={"center"}
        style={{ paddingBottom: "10px" }}
      >
        Create New Product
      </Typography>
      <Grid2 component="form" style={{ display: "grid", gap: "20px" }} onSubmit={handleAdd}>
        <TextField
          value={NewProduct.title}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={handlechange}
        />
        <TextField
          value={NewProduct.category}
          name="category"
          label="Category"
          variant="outlined"
          fullWidth
          onChange={handlechange}
        />
        <TextField
          name="description"
          label="description"
          variant="outlined"
          value={NewProduct.description}
          onChange={handlechange}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              value={NewProduct.rating.rate}
              type="number"
              name="rating.rate"
              label="Rating"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              value={NewProduct.rating.count}
              type="number"
              name="rating.count"
              label="Count"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid2>
        </Grid2>
        <Button variant="contained" type="submit">Add</Button>
      </Grid2>
    </Paper>
  );
};

export default NewProduct;
