import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormikProvider, useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  selectCurrentUser,
  selectUserStatus,
  signIn,
} from "../../features/user/userSlice";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import bcrypt from "bcryptjs";
import { selectAllUsers } from "../../features/users/usersSlice";

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

export default function SignInSide() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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

  const { username, password } = values;

  const handleSignIn = () => {
    const generatedHash = bcrypt.hashSync(
      password,
      "$2a$10$CwTycUXWue0Thq9StjUM0u"
    );

    const user = users.find(
      (u) => u.username === username && u.password === generatedHash
    );

    if (!user) {
      alert("Incorrect username or password");
      return;
    }

    const initialUser = {
      ...user,
    };

    dispatch(signIn(initialUser));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/warehouse");
    }
  }, [currentUser, navigate]);

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
              Sign in
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
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    value={password}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <RouterLink to="register">
                      {"Don't have an account? Sign Up"}
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
