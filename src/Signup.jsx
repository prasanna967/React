import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let scema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter your Full name"),
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches(/^[a-z0-9]+@[a-z]{3,5}.[a-z]{3,4}$/, "Enter valid Email"),
    age : yup.number().integer().positive().required("Enter your age").min(18,"Age above 18 is required").max(30,"Under 30 age to create an account"),
    password : yup.string().required("Enter strong password"),
    cpassword : yup.string().required("Conform password").oneOf([yup.ref("password"),null],"password is not  matching")
});

let renderCount = 0;

const Signup = () => {
  let paperstyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px",
  };
  renderCount++;
  const [input, setinput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scema),
  });
  console.log(errors);
  let handleData = (data) => {
    console.log(data);
  };
  return (
    <Paper
      elevation={20}
      style={paperstyle}
      component={"form"}
      onSubmit={handleSubmit(handleData)}
    >
      <Typography variant="h5">Create Account {renderCount} </Typography>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      ></TextField>

      <TextField
        label="Email"
        {...register("email")}
        error={errors.email}
        helperText={errors.email?.message}
      ></TextField>

      <TextField
        label="Age"
        type="number"
        {...register("age")}
        error={!!errors.age}
        helperText={errors.age?.message}
      ></TextField>

      <TextField label="Password" {...register("password")}
      error = {!!errors.password}
      helperText = {errors.password?.message}></TextField>


      <TextField
        label="Conform Password"
        {...register("cpassword")}
        error = {!!errors.cpassword}
        helperText = {errors.cpassword?.message}
      ></TextField>

      <Button variant="contained" type="submit">
        sign up
      </Button>
    </Paper>
  );
};

export default Signup;
