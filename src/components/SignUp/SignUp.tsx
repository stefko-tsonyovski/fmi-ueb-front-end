import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormikProvider, useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  selectUserError,
  selectUserStatus,
  signIn,
} from "../../features/user/userSlice";
import { createUser, selectAllUsers } from "../../features/users/usersSlice";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Warehouse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector(selectAllUsers);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: () => {
      handleSignIn();
    },
  });

  const {
    // errors,
    // touched,
    values,
    handleChange,
    handleSubmit,
  } = formik;

  const { username, password, confirmPassword, email, phoneNumber } = values;

  const handleSignIn = () => {
    const usernamePattern = "([A-Za-z_]{5,15})\\w+";
    const emailPattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    const phonePattern = "^\\d{3}?[- ]?\\d{3}[- ]?\\d{4}$";
    const passwordPattern =
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@-_~])[A-Za-z@-_~|]{6,20}$";

    const usernameRegex = new RegExp(usernamePattern);
    const emailRegex = new RegExp(emailPattern);
    const phoneRegex = new RegExp(phonePattern);
    const passwordRegex = new RegExp(passwordPattern);

    if (!usernameRegex.test(username)) {
      alert("Invalid username!");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid email!");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      alert("Invalid phone!");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Invalid password!");
      return;
    }

    const generatedHash = bcrypt.hashSync(
      password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );

    const user = users.find(
      (u) => u.email === email || u.username === username
    );

    if (user) {
      alert("Such user already exists!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const initialUser = {
      id: uuidv4(),
      username,
      password: generatedHash,
      email,
      phoneNumber,
    };

    dispatch(createUser(initialUser));
    dispatch(signIn(initialUser));
    navigate("/warehouse");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <FormikProvider value={formik}>
              <form onSubmit={handleSubmit}>
                <Box mt={2} mb={2}>
                  <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    onChange={handleChange}
                    value={username}
                  />
                </Box>

                <Box mt={2} mb={2}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    value={email}
                  />
                </Box>

                <Box mt={2} mb={2}>
                  <TextField
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    onChange={handleChange}
                    value={phoneNumber}
                  />
                </Box>

                <Box mt={2} mb={2}>
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    value={password}
                  />
                </Box>

                <Box mt={2} mb={2}>
                  <TextField
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    onChange={handleChange}
                    value={confirmPassword}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <RouterLink to="/">
                      {"Already have an account? Sign In"}
                    </RouterLink>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </form>
            </FormikProvider>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
