import Paper from "@mui/material/Paper";
import { Grid2, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LifeLine } from "react-loading-indicators";

const Updateproduct = () => {
  const [updateproduct, setupdateproduct] = useState(null);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setupdateproduct(res.data));
  }, []);

  let handlechange = (e) => {
    let { value, name } = e.target;

    let fieldname = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setupdateproduct({
        ...updateproduct,
        rating: {
          ...updateproduct.rating,
          [fieldname]: value,
        },
      });
    } else {
      setupdateproduct({
        ...updateproduct,
        [name]: value,
      });
    }
  };

  let handleupdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateproduct),
    }).then(() => {
      alert("Saved successfully saved");
      navigate("/Products");
    });
  };

  let paperstyle = {
    width: "400px",
    margin: "20px auto",
    padding: "10px",
  };

  if (updateproduct !== null) {
    return (
      <Paper elevation={20} style={paperstyle}>
        <Typography
          variant="h4"
          textAlign={"center"}
          style={{ paddingBottom: "10px" }}
        >
          Update Product
        </Typography>
        <Grid2
          component="form"
          style={{ display: "grid", gap: "20px" }}
          onSubmit={handleupdate}
        >
          <TextField
            value={updateproduct.title}
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handlechange}
          />
          <TextField
            value={updateproduct.category}
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
            value={updateproduct.description}
            onChange={handlechange}
          />
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <TextField
                value={updateproduct.rating.rate}
                type="number"
                name="rating.rate"
                label="Rating"
                variant="outlined"
                onChange={handlechange}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                value={updateproduct.rating.count}
                type="number"
                name="rating.count"
                label="Count"
                variant="outlined"
                onChange={handlechange}
              />
            </Grid2>
          </Grid2>
          <Button color="success" type="submit" variant="contained" fullWidth>
            Save
          </Button>
        </Grid2>
      </Paper>
    );
  } else {
    <div>
      {" "}
      <center>
        <LifeLine
          color="#32cd32"
          size="medium"
          text="Looding please wait"
          textColor="red"
        />
      </center>
    </div>;
  }
};

export default Updateproduct;
